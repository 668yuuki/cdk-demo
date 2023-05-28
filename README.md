# cdk-demo
aws-cdk学習用リポジトリ

# 前準備

1. npmのインストール  
[こちら](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)よりインストールを実施。

1. npmのAWS CDK CLI 
    ```
    npm install -g aws-cdk
    ```   
   * インストールの確認
    ```
    cdk --version
    ```
1. AWS アカウントのブートストラップ
    ```
    cdk bootstrap aws://<<アカウント番号>>/<<リージョン>>
    ```   

# デプロイ手順

1. デプロイの実施  
    プロジェクト(CDK-DEMO)のフォルダにて以下のコマンドを実施。
    ```
    cdk deploy
    ```

1. ECRへのDockerイメージをpush
   * ECRが作成されたら[こちら](https://github.com/668yuuki/springboot-demo#aws-ecr%E3%81%B8%E3%81%AEpush%E6%89%8B%E9%A0%86)よりDockerイメージを作成し、ECRへpush 
   * 現状はECSのデプロイについてECRにイメージがないとデプロイが完了しないため調査が必要。
   * 強制的にECSのデプロイを完了する方法は[こちら](https://aws.amazon.com/jp/premiumsupport/knowledge-center/ecs-service-stuck-update-status/)
  
2. リソースのクリンナップの実施  
    プロジェクト(CDK-DEMO)のフォルダにて以下のコマンドを実施。
    ```
    cdk destroy
    ```

↓cdk作成時のreadme
# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
  
