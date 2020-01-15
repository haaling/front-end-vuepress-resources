## Q & A

### **1. git删除远端分支？**
```
git branch -r -d origin/branchName
git push origin :branchName( :与branchName之间没有空格) -- 将本地空分支推到远端分支
```