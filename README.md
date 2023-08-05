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
![image](https://github.com/epigone707/summonsTyper/assets/62321106/047aead6-2c53-48a4-977a-8a3c3688ac8c)


Start the test 开始测试:
![屏幕截图 2023-08-05 120648](https://github.com/epigone707/summonsTyper/assets/62321106/2fb49be4-f444-4f60-a9f9-4f1d3858bafa)


After you finish the test, the score board shows 完成测试后，可以查看成绩:
![屏幕截图 2023-08-05 120746](https://github.com/epigone707/summonsTyper/assets/62321106/69bbcf5c-75a0-4e04-978d-965581918fe0)


You can also check your score history 查看历史成绩:
![屏幕截图 2023-08-05 120606](https://github.com/epigone707/summonsTyper/assets/62321106/685d104d-cd4b-4289-9ffd-3f7c72740400)



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
