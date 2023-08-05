# summonsTyper
An app that helps users practice reprint summons, built by Electron. 一个基于Electron的、用于练习翻打传票的小应用。

# Usage
应用会自动读取当前目录下名为`input.txt`的文件，该文件格式为，每一行一个数字。

样例如下：
```
854.63
253.93
447.35
396.90
464.07
630.45
950.22
665.66
...
```


Main page 主界面:
![image](https://github.com/epigone707/summonsTyper/assets/62321106/15ec1bd6-39ed-4a8d-b3d5-fee2a7b99fd0)

Start the test 开始测试:
![image](https://github.com/epigone707/summonsTyper/assets/62321106/f995dfca-156a-45c0-96a5-24f96151b74b)

After you finish the test, the score board shows 完成测试后，可以查看成绩:
![image](https://github.com/epigone707/summonsTyper/assets/62321106/45324784-334f-4132-9d57-a70149eb08b8)

You can also check your score history 查看历史成绩:
![image](https://github.com/epigone707/summonsTyper/assets/62321106/8eebe54e-85e3-4cfe-94ee-97e9e05a3abb)


# Installation

## Option 1. Install executable
You can install the executables from [the release page](https://github.com/epigone707/summonsTyper/releases/tag/v1.0)

## Option 2. Build From Source
First, install Electron Forge:
```
npm install --save-dev @electron-forge/cli
npx electron-forge import
```
Then Run:
```
npm run make
```
