# 三只小猪

## 题目背景

你听说过三只小猪的故事吗？这是一个经典的故事。很久很久以前，有三只小猪。第一只小猪用稻草建的房子，第二个小猪用木棍建的房子，第三个小猪则使用砖做为材料。一只大灰狼想吃掉它们并吹倒了稻草和木棍建的房子。但是砖盖的房子很结实，狼最终也没有破坏掉，最后小猪们战胜了大灰狼并把它尾巴烧掉了。

## 题目描述

为了自己的安全，小猪们又建造了一个新砖房。但是现在问题出现了，怎样把三个小猪分配到两个房子里呢？第三只小猪是三只小猪中最聪明的一只，为了不浪费任何一个房子，它总共考虑了三种方案，如下图

 ![](https://cdn.luogu.com.cn/upload/pic/6862.png) 

“但是将来怎么办呢？”第三只小猪知道将来随着成员的增多，它们将会盖更多的房子。它想知道给定了房子和猪的数目后，房子的分配方案有多少，但这个问题对于它来说，很明显有点难了，你能帮小猪解决这个问题吗？

## 输入格式

输入文件piggy.in，仅有一行，包含两个整数n和m，分别表示小猪的数目和房间数（1≤n≤50，0≤m≤50）。

## 输出格式

输出文件piggy.out，仅一个整数，表示将n只小猪安置在m个房间且没有房间空闲的方案数。

## 样例 #1

### 样例输入 #1

```
4 2
```

### 样例输出 #1

```
7
```

## 样例 #2

### 样例输入 #2

```
6 7
```

### 样例输出 #2

```
0
```

## 题目分析

可以令$f[i][j]$表示将$i$只小猪分配到$j$个房间里且至少有一个房间空闲的方案数。那么，$f[i][j]$可以通过以下方式计算得出：

1. 将$i$只小猪分配到$j-1$个房间里，然后从这$j-1$个房间中选择一个房间，将多余的小猪放入这个房间中。这种情况下，有$f[i][j-1]$种方案。

2. 将$i$只小猪分配到$j-2$个房间里，然后从这$j-2$个房间中选择两个房间，将多余的小猪放入这两个房间中。这种情况下，有$C_{j}^{2}\times f[i][j-2]$种方案。

3. ...

依此类推，我们可以得到以下的递推式：

$$f[i][j] = \sum_{k=1}^{j}(-1)^{k+1}C_{j}^{k}\times (j-k)^{i}$$

最终，我们需要计算将$n$只小猪分配到$m$个房间里且没有房间空闲的方案数。这个问题可以通过容斥原理来解决，即：

$$ans = \sum_{i=1}^{m}(-1)^{i+1}C_{m}^{i}\times f[n][i]$$

其中，$ans$表示最终的答案。

## Python 实现

```python
def work(n, m):
    # 初始化一个二维数组，用于记录每种情况下放球的方案数
    f = [[0 for i in range(300)] for i in range(300)]
    
    # 对于只有一个盒子的情况，放置 n 个球只有一种方案
    for i in range(1, n + 1):
        f[i][1] = 1
    
    # 对于多个盒子的情况，使用动态规划求解
    for i in range(2, n + 1):
        for j in range(2, m + 1):
            # 状态转移方程：f[i][j] = f[i - 1][j - 1] + j * f[i - 1][j]
            # 左边的表达式表示 i 个球放到 j 个盒子中的方案数
            # 右边第一部分 f[i - 1][j - 1] 表示将 i-1 个球放在 j-1 个盒子里再加上第 i 个球单独放到一个新盒子中的方案数
            # 右边第二部分 j * f[i - 1][j] 表示将第 i 个球放到 j 个盒子中的方案，即前 i-1 个球任意放在 j 个盒子中（共有 f[i - 1][j] 种情况），再将第 i 个球放入任意一个盒子（共有 j 种情况）
            f[i][j] = f[i - 1][j - 1] + j * f[i - 1][j]
    
    # 返回放置 n 个球到 m 个盒子中的方案数
    return f[n][m]


def main():
    # 从控制台读取两个字符串参数，并转换为整型
    s = input().split()
    n, m = int(s[0]), int(s[1])
    
    # 调用 work 函数计算结果并输出到控制台
    print(work(n, m))

# 程序入口
if __name__ == '__main__':
    main()
```

函数 work(n, m) 通过动态规划求解出将 n 个球放入 m 个盒子中的方案数。具体地，使用 f[i][j] 表示将 i 个不同的球放入 j 个不同的盒子中，每个盒子至少有一个球的方案数。

对于只有一个盒子的情况，显然有将 n 个球全部放入这一个盒子的方案，而其他情况可以使用递推计算。具体的，对于 f[i][j]，需要从 f[i-1][j-1] 和 f[i-1][j] 中计算得到，其中 f[i-1][j-1] 表示将 i-1 个球放在 j-1 个盒子里再加上第 i 个球单独放到一个新盒子中的方案数；f[i-1][j] 表示前 i-1 个球任意放在 j 个盒子中的方案数，再将第 i 个球放入任意一个盒子中（共有 j 种情况）。

在主函数 main() 中，从控制台读取两个字符串参数，并转换为整型，然后调用 work 函数计算结果并输出到控制台。

## C++ 实现

```c++
#include<iostream>
#include<cstdio>
#include<cmath>
#include<string>
#include<algorithm>
using namespace std;

int f[60][60][60]; // 使用三维数组 f 存放答案，f[i][j][0] 表示 f[i][j] 中位数的位置（即共有多少位数字）

int _ans[60], _size; // 辅助数组 _ans 和 _size，用于计算高精度加法

int n, m;

void _change(int x, int y)
{
    if (y > x) return; // 当 y > x 时，无法进行分组放置，直接返回
    if (x == 1 && y == 1) return; // 当 x == 1 && y == 1 时，只有一种情况，即将这个球放在这个盒子里

    // 将 _ans 数组清零
    for (int i = 1; i <= _size; i++)
        _ans[i] = 0;
    _size = 1;

    int _x = 0;

    // 将 f[x-1][y] 相应的位乘上 y，然后加上进位 _x，存入 _ans 数组中
    for (int i = 1; i <= f[x - 1][y][0]; i++)
    {
        _ans[i] = f[x - 1][y][i] * y + _x;
        _x = _ans[i] / 10;
        _ans[i] %= 10;
    }
    _size = f[x - 1][y][0];

    // 如果进位 _x 不为 0，将其存入 _ans 数组中
    if (_x != 0)
        _ans[++_size] = _x;

    f[x][y][0] = 1;
    _x = 0;

    // 对于 f[x-1][y-1] 和 _ans 数组的每一位，进行高精度加法
    while (f[x][y][0] <= f[x - 1][y - 1][0] || f[x][y][0] <= _size)
    {
        f[x][y][f[x][y][0]] = f[x - 1][y - 1][f[x][y][0]] + _ans[f[x][y][0]] + _x;
        _x = f[x][y][f[x][y][0]] / 10;
        f[x][y][f[x][y][0]] %= 10;
        f[x][y][0]++;
    }

    // 将最后一次的进位存入 f[x][y] 数组中
    f[x][y][f[x][y][0]] = _x;

    // 如果最高位是 0，同时不是只有一位数，那么将其删除
    if (f[x][y][f[x][y][0]] == 0 && f[x][y][0] > 1)
        f[x][y][0]--;
}

int main()
{
    scanf("%d%d", &n, &m);

    // 特判当 m > n 时，无法进行分组放置，直接输出 0
    if (m > n)
    {
        cout << 0;
        return 0;
    }

    // 当只有一个盒子或一个球时，方案数都是 1
    f[1][1][0] = 1;
    f[1][1][1] = 1;

    // 对于每个球 i，枚举放在哪个盒子 j 中
    for (int i = 2; i <= n; i++)
        for (int j = 1; j <= min(i, m); j++)
            _change(i, j);

    // 如果最后得到的结果为 0，说明无法分组放置，直接输出 0
    if (f[n][m][0] == 1 && f[n][m][1] == 0)
    {
        cout << 0;
        return 0;
    }

    // 将 f[n][m] 数组中存放的数字倒序输出
    for (int i = f[n][m][0]; i >= 1; i--)
        printf("%d", f[n][m][i]);
}
```

在此代码中，使用了三维数组 f 存储计算结果，其中 f[i][j][0] 表示 f[i][j] 中位数的位置（即由多少位数字组成）。对于一个球 i，将其依次放入 j 个盒子中，使用辅助数组 _ans 和 _size 计算高精度加法，将 f[i-1][j-1][k] 和 _ans[k] 相加，并将进位存入 _x 中，然后将相加的结果存入 f[i][j][k] 中。在计算过程中，如果某个位置 k 超出当前数组存储的位数范围，则认为这一位数字为 0。

在主函数 main() 中，读入两个整型参数 n 和 m，特判当 m > n 时输出 0。接着，依次枚举所有球和盒子的组合方式，调用辅助函数 _change(i, j) 计算方案数。最后，将得到的结果倒序输出即可。

需要注意的是，在进行高精度加法时，应该先将 _ans 数组置零，避免多次加法产生错误。同时，在将数字存入 f 数组中时，可以先对其取模再记录进位，并将次高位与进位一起加入下一位的计算中，提高计算效率。