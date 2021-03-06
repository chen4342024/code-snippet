# git 操作

### git 基本操作

`git pull 拉取`

`git commit -m提交`

`git push origin 推送到远程分支`

`git checkout test 切换分支`

`git merge [name] 将分支name合并到当前分支`

### git 查看日志

`git log 查看日志`

`git log --pretty=oneline 文件名 查看文件修改记录`

### git 对比差异

`git diff origin/xxx 对比差异`

`git diff origin/xxx --stat 对比差异，显示简单信息`

`git diff SHA1 SHA2 对比两个版本间的差异`

### git 新建远程分支

`git branch 分支名 创建本地分支`

`git checkout 分支名 切换分支`

`git push origin 分支名 推送到远程`

`git branch -d 分支名 删除本地分支`

### git 查看忽略文件

`git check-ignore -v 文件名`

`git add \* 查看所有文件`

### git 回滚

#### 回滚 master

1. 当前 master 版本有问题，创建一个新分支 master-20190614 出来
2. 回滚到对应的版本

-   `git reset --hard xxxxxxxx` ：回滚本地
-   `git push -f` : 强推到远程分支

> 这时候 , master 已经回滚到上一个版本 xxxxx 了

#### 修完问题再重新上

1. 在上一步创建出来的 `master-20190614` 中，修复问题
2. 修复完合并 `master-20190614` --> `master`
3. `git push` 推送上去

### 撤销本地的修改
` git reset --hard HEAD `


### 查看 tag 以及对应的 commidId
` git ls-remote --tags origin `;