import { App, Stack, StackProps } from 'aws-cdk-lib';
import * as aws_ecr from 'aws-cdk-lib/aws-ecr';

export class CdkDemoEcrStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const demoEcr = new aws_ecr.Repository(this, 'DemoEcr');
  }
}
