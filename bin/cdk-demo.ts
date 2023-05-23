#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkDemoEcrStack } from "../lib/cdk-demo-ecr-stack";
import { CdkDemoCodePipelineStack } from "../lib/cdk-demo-codePipeline-stack";

const app = new cdk.App();
const env = { account: "116707747645", region: "ap-northeast-1" }

new CdkDemoEcrStack(app, "CdkDemoEcrStack", {
  env,
});

new CdkDemoCodePipelineStack(app, "CdkDemoCodePipelineStack", {
  env,
});