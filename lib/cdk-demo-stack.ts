import {
  aws_ec2,
  aws_ecr,
  // aws_codepipeline,
  // aws_codepipeline_actions,
  // aws_codebuild,
  aws_ecs,
  Stack,
  StackProps,
  aws_ecs_patterns,
  Duration,
} from "aws-cdk-lib";
import { HealthCheck } from "aws-cdk-lib/aws-appmesh";
import { Construct } from "constructs";

export class CdkDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // const vpc = aws_ec2.Vpc.fromLookup(this, "vpc", { vpcName: "demo" }); // 既存のVPCを調べて取得する。

    const demoEcr = new aws_ecr.Repository(this, "DemoEcr_20230509", {repositoryName: "demo/repository_2023/0509_11"});

    // const demoPipeline = new aws_codepipeline.Pipeline(this, "DemoPipeline");

    // const sourceOutput = new aws_codepipeline.Artifact();
    // const buildOutput = new aws_codepipeline.Artifact();

    // const sourceAction = new aws_codepipeline_actions.EcrSourceAction({
    //   actionName: 'ECR',
    //   repository: demoEcr,
    //   output: sourceOutput,
    // });

    // demoPipeline.addStage({
    //   stageName: 'Source',
    //   actions: [sourceAction],
    // });

    // const project = new aws_codebuild.PipelineProject(this, "DemoProject");

    // const buildAction = new aws_codepipeline_actions.CodeBuildAction({
    //   actionName: 'CodeBuild',
    //   project: project,
    //   input: sourceOutput,
    //   outputs: [buildOutput],
    // });
    
    // demoPipeline.addStage({
    //   stageName: 'Build',
    //   actions: [buildAction],
    // });

    // const demoCluster = new aws_ecs.Cluster(this, "DemoCluster", {
    //   vpc: vpc
    // });

    const demoFargateService = new aws_ecs_patterns.ApplicationLoadBalancedFargateService(this, "DemoFargateService", {
      // cluster: demoCluster,
      memoryLimitMiB:1024,
      cpu:256,      
      taskImageOptions: {
        image: aws_ecs.ContainerImage.fromEcrRepository(demoEcr),
        containerPort: 8080,
      },
      publicLoadBalancer: true,
    });
  
    // const deployAction = new aws_codepipeline_actions.EcsDeployAction({
    //   actionName: 'DeployAction',
    //   service: demoFargateService.service,
    //   input: sourceOutput,
    // });

    // demoPipeline.addStage({
    //   stageName: 'Deploy',
    //   actions: [deployAction],
    // });
 }
}