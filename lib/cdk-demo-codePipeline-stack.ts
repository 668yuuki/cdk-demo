import {
  aws_ecr,
  aws_ecs,
  aws_codepipeline,
  aws_codepipeline_actions,
  aws_codebuild,
  Stack,
  StackProps,
  aws_ecs_patterns,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as yaml from 'yaml';

export class CdkDemoCodePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const demoPipeline = new aws_codepipeline.Pipeline(this, "DemoPipeline");
    const sourceOutput = new aws_codepipeline.Artifact();
    const buildOutput = new aws_codepipeline.Artifact();
    const ecrRepository = aws_ecr.Repository.fromRepositoryName(this, "repo1", "demo/repository_2023/0509_11");

    // Source Stage
    const sourceAction = new aws_codepipeline_actions.EcrSourceAction({
      actionName: "ECR_Source",
      repository: ecrRepository,
      output: sourceOutput,
    });
    demoPipeline.addStage({
      stageName: "Source",
      actions: [sourceAction],
    });

    const taskDefinition = new aws_ecs.FargateTaskDefinition(this, 'TaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });
    taskDefinition.addContainer("WebContainer", {
      image: aws_ecs.ContainerImage.fromEcrRepository(ecrRepository),
      portMappings: [{ containerPort: 8080 }],
    });
    
    const demoFargateService = new aws_ecs_patterns.ApplicationLoadBalancedFargateService(this, "DemoFargateService", {
      taskDefinition,      
      publicLoadBalancer: true,
    });

    const fromYaml = yaml.parse(`
    version: 0.2

    phases:
      build:
        commands:
          - echo Build started
          - printf '[{"name":"WebContainer","imageUri":"116707747645.dkr.ecr.ap-northeast-1.amazonaws.com/demo/repository_2023/0509_11:latest"}]' > imagedefinitions.json
    artifacts:
        files: imagedefinitions.json
  `);

    const project = new aws_codebuild.PipelineProject(this, "DemoProject", {
      buildSpec: aws_codebuild.BuildSpec.fromObjectToYaml(fromYaml)
    });

    const buildAction = new aws_codepipeline_actions.CodeBuildAction({
      actionName: 'CodeBuild',
      project: project,
      input: sourceOutput,
      outputs: [buildOutput],
    });
    
    demoPipeline.addStage({
      stageName: 'Build',
      actions: [buildAction],
    });

    // Deploy Stage
    const deployAction = new aws_codepipeline_actions.EcsDeployAction({
      actionName: "Fargate_Deploy",
      service: demoFargateService.service,
      input: buildOutput,
    });

    demoPipeline.addStage({
      stageName: "Deploy",
      actions: [deployAction],
    });
 }
}