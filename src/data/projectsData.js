// 编程项目数据 - 详细版
export const projectsData = [
  {
    id: 1,
    title: '猜数字小游戏',
    icon: '🎮',
    description: '实现经典的猜数字游戏，锻炼逻辑思维和循环控制能力',
    scenario: '你要开发一个猜数字游戏。程序会随机生成1-100之间的数字，用户需要通过猜数字来找到正确答案，程序会给出"大了"或"小了"的提示。',
    tasks: [
      {
        id: 'task1',
        title: '任务1：生成随机数',
        
        objective: '学习使用random模块生成指定范围内的随机数',
        
        knowledgePoints: [
          { name: 'import random', desc: '导入Python内置的随机数模块' },
          { name: 'random.randint(a, b)', desc: '生成[a, b]范围内的随机整数，包含端点' },
          { name: 'def 函数名():', desc: '定义一个函数，封装功能' },
          { name: 'return', desc: '从函数返回值给调用者' },
          { name: 'print()', desc: '输出内容到控制台' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：导入random模块',
            action: '先导入需要用到的随机数模块',
            code: 'import random\nprint("模块导入成功!")',
            explanation: 'random是Python内置的随机数生成模块，不需要额外安装。randint()是其中最常用的函数之一。'
          },
          {
            stepTitle: '步骤2：测试随机数生成',
            action: '先简单测试一下randint函数的用法',
            code: `# 生成几个随机数看看
for i in range(5):
    num = random.randint(1, 100)
    print(f"第{i+1}个随机数: {num}")`,
            explanation: '每次调用randint(1, 100)都会返回一个1到100之间的新随机整数。多次运行你会看到不同的结果。'
          },
          {
            stepTitle: '步骤3：定义生成随机数的函数',
            action: '把生成随机数的功能封装成函数',
            code: `def generate_random_number():
    # 生成1-100之间的随机整数
    secret_number = random.randint(1, 100)
    return secret_number`,
            explanation: '函数是组织代码的好方式。通过定义函数，我们可以在需要的时候随时调用这个功能。'
          },
          {
            stepTitle: '步骤4：调用函数并显示结果',
            action: '调用我们的函数，测试是否正常工作',
            code: `if __name__ == '__main__':
    secret = generate_random_number()
    print(f"随机数已生成: {secret}")
    print("游戏准备就绪!")`,
            explanation: '__name__ == "__main__" 这一判断确保代码在直接运行时才执行，被导入时不执行。'
          }
        ],
        
        codeTemplate: `import random

def generate_random_number():
    # 生成1-100之间的随机整数
    secret_number = random.randint(1, 100)
    return secret_number

if __name__ == '__main__':
    secret = generate_random_number()
    print(f"随机数已生成: {secret}")
    print("游戏准备就绪!")`,
        
        expectedOutput: `随机数已生成: 42
游戏准备就绪!`,
        
        commonErrors: [
          {
            error: '忘记导入random模块',
            solution: '第一行加上 import random，否则调用randint会报错'
          },
          {
            error: 'randint参数顺序错误或范围不合法',
            solution: 'randint(a, b)要求a <= b，范围要合理'
          },
          {
            error: '函数没有return语句',
            solution: '记得用return返回结果，否则函数调用后得到None'
          }
        ],
        
        tips: [
          '💡 random.seed() 可以设置随机种子，让结果可复现',
          '💡 除了randint，还有random()生成0-1小数，choice()随机选列表元素'
        ]
      },
      
      {
        id: 'task2',
        title: '任务2：实现猜数字逻辑',
        
        objective: '学习使用while循环和if-elif-else条件判断实现完整游戏逻辑',
        
        knowledgePoints: [
          { name: 'while True:', desc: '无限循环，需要break跳出' },
          { name: 'int(input())', desc: '获取用户输入并转为整数' },
          { name: 'if/elif/else', desc: '多条件分支判断' },
          { name: 'break', desc: '跳出当前循环' },
          { name: 'count += 1', desc: '计数累加的简写' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：搭建基本游戏框架',
            action: '先写好循环和输入的基本结构',
            code: `import random

def guess_number_game():
    secret_number = random.randint(1, 100)
    attempts = 0
    
    print("欢迎来到猜数字游戏!")
    print("我已经想好了一个1-100之间的数字。")
    
    while True:
        # 游戏循环
        pass`,
            explanation: 'while True创建一个无限循环，游戏会一直进行直到猜对答案。pass是占位符，表示暂时不做任何操作。'
          },
          {
            stepTitle: '步骤2：添加条件判断',
            action: '比较猜测值和答案，给出相应提示',
            code: `while True:
    guess = int(input("请输入你的猜测 (1-100): "))
    attempts += 1
    
    if guess > secret_number:
        print("太大了! 再试试小点的数")
    elif guess < secret_number:
        print("太小了! 再试试大点的数")
    else:
        print(f"🎉 恭喜! 你用了{attempts}次猜对了!")
        break`,
            explanation: 'if-elif-else结构适合这种多分支判断。else表示所有条件都不满足的情况（即相等），这时候用break退出循环。'
          },
          {
            stepTitle: '步骤3：为浏览器环境调整',
            action: '因为浏览器中input可能受限，我们模拟这个过程',
            code: `print("⚠️ 在浏览器环境中，input()功能有限")
print("这里直接演示逻辑:")

# 模拟几次猜测
for i in range(1, 6):
    guess = random.randint(1, 100)
    attempts += 1
    print(f"第{i}次猜测: {guess}")
    
    if guess == secret_number:
        print(f"🎉 恭喜! 你用了{attempts}次猜对了!")
        break
else:
    print(f"正确答案是: {secret_number}")`,
            explanation: '在Pyodide环境中，完整的交互式input可能有限制。我们用随机数模拟这个过程，演示核心逻辑。'
          }
        ],
        
        codeTemplate: `import random

def guess_number_game():
    secret_number = random.randint(1, 100)
    attempts = 0
    
    print("欢迎来到猜数字游戏!")
    print("我已经想好了一个1-100之间的数字。")
    print()
    
    # 模拟游戏过程（浏览器环境下无法使用input）
    print("模拟游戏过程:")
    
    while attempts < 10:
        guess = random.randint(1, 100)
        attempts += 1
        
        if guess > secret_number:
            print(f"第{attempts}次猜测: {guess} - 太大了!")
        elif guess < secret_number:
            print(f"第{attempts}次猜测: {guess} -太小了!")
        else:
            print(f"🎉 恭喜! 第{attempts}次猜对了! 正确答案是{secret_number}")
            break
    
    if attempts >= 10:
        print(f"游戏结束! 正确答案是: {secret_number}")

if __name__ == '__main__':
    guess_number_game()`,
        
        expectedOutput: `欢迎来到猜数字游戏!
我已经想好了一个1-100之间的数字。

模拟游戏过程:
第1次猜测: 42 - 太大了!
第2次猜测: 20 - 太小了!
第3次猜测: 30 - 🎉 恭喜! 第3次猜对了! 正确答案是30`,
        
        commonErrors: [
          {
            error: '忘记将输入转换为整数',
            solution: 'input()返回字符串，必须用int()转换才能比较大小'
          },
          {
            error: '条件判断逻辑顺序错误',
            solution: '先判断大了，再判断小了，最后处理等于的情况'
          },
          {
            error: '循环中忘记break导致无限循环',
            solution: '猜对后一定要用break语句跳出while循环'
          }
        ],
        
        tips: [
          '💡 可以记录历史猜测，避免重复猜测',
          '💡 二分查找是最快的猜数字策略！最多7次就能猜出'
        ]
      }
    ]
  },
  
  {
    id: 2,
    title: '排行榜排序实现',
    icon: '🏆',
    description: '学习使用不同排序算法实现排行榜功能',
    scenario: '你需要为游戏开发一个排行榜系统。玩家的分数数据已经收集好了，现在需要按照分数从高到低排序，如果分数相同则按玩家姓名排序。',
    tasks: [
      {
        id: 'task1',
        title: '任务1：冒泡排序',
        
        objective: '学习和实现冒泡排序算法',
        
        knowledgePoints: [
          { name: '列表索引', desc: 'list[i] 访问列表第i个元素' },
          { name: 'range(len(list))', desc: '遍历列表索引' },
          { name: '交换元素', desc: 'a, b = b, a 一行代码交换两个变量' },
          { name: '嵌套循环', desc: '循环内套循环的结构' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解冒泡排序的原理',
            action: '了解冒泡排序的基本思想',
            code: `# 冒泡排序原理：
# - 重复遍历列表，比较相邻元素
# - 如果顺序错误就交换它们
# - 每轮结束后，最大的元素会"冒泡"到最后
# - 时间复杂度：O(n²)`,
            explanation: '冒泡排序是最简单的排序算法之一。虽然效率不算最高，但非常适合学习排序的基本概念。'
          },
          {
            stepTitle: '步骤2：准备要排序的数据',
            action: '创建一个待排序的分数列表',
            code: `scores = [85, 92, 78, 90, 88, 76, 95, 82]
print("原始分数:", scores)`,
            explanation: '先有一些待排序的数据，才能测试排序算法。'
          },
          {
            stepTitle: '步骤3：实现外层循环控制轮数',
            action: '需要进行n-1轮排序',
            code: `def bubble_sort(scores):
    n = len(scores)
    # 外层循环：需要进行n-1轮排序
    for i in range(n):
        print(f"第{i+1}轮排序开始")
        # 内层循环待填
    return scores`,
            explanation: 'n个元素排序需要进行n-1轮，因为每轮都能确定一个元素的位置。'
          },
          {
            stepTitle: '步骤4：实现内层循环比较交换',
            action: '每轮中比较相邻元素并交换',
            code: `def bubble_sort(scores):
    n = len(scores)
    
    for i in range(n):
        # 内层循环：比较相邻元素
        # 每轮可以少比较i个（最后i个已经排好了）
        for j in range(n - i - 1):
            # 如果前一个比后一个大，就交换
            if scores[j] > scores[j + 1]:
                scores[j], scores[j + 1] = scores[j + 1], scores[j]
                print(f"交换位置: {scores}")
    
    return scores`,
            explanation: '每一轮排序，都会有一个最大的元素"冒"到最后。所以每一轮可以少比较一些元素。'
          },
          {
            stepTitle: '步骤5：测试排序算法',
            action: '运行函数看看结果是否正确',
            code: `if __name__ == '__main__':
    scores = [85, 92, 78, 90, 88, 76, 95, 82]
    print("排序前:", scores)
    
    sorted_scores = bubble_sort(scores.copy())  # copy避免修改原列表
    print("排序后:", sorted_scores)`,
            explanation: '测试时最好用copy()复制一份数据，避免原数据被修改。'
          }
        ],
        
        codeTemplate: `def bubble_sort(scores):
    """
    冒泡排序算法
    将分数列表从小到大排序
    """
    n = len(scores)
    # 外层循环控制排序轮数
    for i in range(n):
        # 内层循环进行相邻比较
        for j in range(n - i - 1):
            # 如果前一个大于后一个，交换它们
            if scores[j] > scores[j + 1]:
                scores[j], scores[j + 1] = scores[j + 1], scores[j]
    
    return scores

if __name__ == '__main__':
    scores = [85, 92, 78, 90, 88, 76, 95, 82]
    print("排序前:", scores)
    
    sorted_scores = bubble_sort(scores.copy())
    print("排序后:", sorted_scores)`,
        
        expectedOutput: `排序前: [85, 92, 78, 90, 88, 76, 95, 82]
排序后: [76, 78, 82, 85, 88, 90, 92, 95]`,
        
        commonErrors: [
          {
            error: '内层循环范围错误',
            solution: '应该用 n - i - 1，因为每轮后最后i个已经排好了'
          },
          {
            error: '比较方向搞反，导致倒序',
            solution: '升序用 >，降序用 <，根据需求确定'
          },
          {
            error: '直接修改了原列表，没有备份',
            solution: '调用函数时使用 list.copy() 或 list[:] 复制一份'
          }
        ],
        
        tips: [
          '💡 冒泡排序虽然简单，但对大数据效率低，实际中用sorted()更多',
          '💡 可以添加标志位，如果某轮没有交换说明已经有序，可以提前退出'
        ]
      },
      
      {
        id: 'task2',
        title: '任务2：带姓名的排行榜',
        
        objective: '学习对复杂数据结构进行排序',
        
        knowledgePoints: [
          { name: 'sorted()', desc: 'Python内置排序函数，返回新列表' },
          { name: 'key参数', desc: '指定排序依据的函数' },
          { name: 'lambda函数', desc: '匿名函数，简单场景使用' },
          { name: 'reverse=True', desc: '设置为降序排序' },
          { name: 'enumerate()', desc: '同时获取索引和值' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：创建玩家数据',
            action: '用字典列表存储玩家信息',
            code: `players = [
    {'name': '小明', 'score': 85},
    {'name': '小红', 'score': 92},
    {'name': '小刚', 'score': 78},
    {'name': '小美', 'score': 90}
]

print("玩家数据:")
for p in players:
    print(f"{p['name']}: {p['score']}分")`,
            explanation: '每个玩家是一个字典，包含name和score字段。这样的数据结构更符合真实业务场景。'
          },
          {
            stepTitle: '步骤2：用key参数按分数排序',
            action: '指定排序的key为score字段',
            code: `# 按分数升序排序
sorted_by_score = sorted(players, key=lambda x: x['score'])
print("\\n按分数升序:")
for p in sorted_by_score:
    print(f"{p['name']}: {p['score']}")`,
            explanation: 'key参数接受一个函数，这个函数返回用于排序的值。lambda是简洁的写法。'
          },
          {
            stepTitle: '步骤3：设置reverse实现降序',
            action: '排行榜通常需要从高到低',
            code: `# 按分数降序排序
sorted_desc = sorted(players, key=lambda x: x['score'], reverse=True)
print("\\n按分数降序:")
for p in sorted_desc:
    print(f"{p['name']}: {p['score']}")`,
            explanation: 'reverse=True会把升序结果反转，变成降序。'
          },
          {
            stepTitle: '步骤4：实现多条件排序',
            action: '分数相同按姓名排序',
            code: `# 先按分数降序，分数相同按姓名字母升序
sorted_multi = sorted(players, key=lambda x: (-x['score'], x['name']))
print("\\n多条件排序 (分数降序，姓名升序):")
for p in sorted_multi:
    print(f"{p['name']}: {p['score']}")`,
            explanation: 'key可以返回元组，会依次按元组元素排序。用-x[\'score\']实现降序效果。'
          },
          {
            stepTitle: '步骤5：显示排名序号',
            action: '添加排名序号，制作完整排行榜',
            code: `def create_ranking(players):
    # 排序
    ranked = sorted(players, key=lambda x: (-x['score'], x['name']))
    
    # 显示带排名的结果
    print("🏆 排行榜")
    print("-" * 30)
    for i, player in enumerate(ranked, 1):
        medal = "🥇" if i == 1 else "🥈" if i == 2 else "🥉" if i == 3 else ""
        print(f"{medal} 第{i}名: {player['name']} - {player['score']}分")

create_ranking(players)`,
            explanation: 'enumerate(ranked, 1)可以从1开始计数，方便显示排名。'
          }
        ],
        
        codeTemplate: `def create_ranking(players):
    """
    创建排行榜
    按分数降序排序，分数相同按姓名升序
    """
    # 按分数降序排序，分数相同按姓名升序
    sorted_players = sorted(players, key=lambda x: (-x['score'], x['name']))
    
    # 打印排行榜
    print("🏆 排行榜")
    print("-" * 30)
    for i, player in enumerate(sorted_players, 1):
        medal = "🥇" if i == 1 else "🥈" if i == 2 else "🥉" if i == 3 else ""
        print(f"{medal} 第{i}名: {player['name']} - {player['score']}分")

if __name__ == '__main__':
    players = [
        {'name': '小明', 'score': 85},
        {'name': '小红', 'score': 92},
        {'name': '小刚', 'score': 78},
        {'name': '小美', 'score': 90}
    ]
    create_ranking(players)`,
        
        expectedOutput: `🏆 排行榜
------------------------------
🥇 第1名: 小红 - 92分
🥈 第2名: 小美 - 90分
🥉 第3名: 小明 - 85分
第4名: 小刚 - 78分`,
        
        commonErrors: [
          {
            error: 'lambda表达式语法错误',
            solution: 'lambda x: x[\'score\'] 这个格式，不要忘记冒号'
          },
          {
            error: 'key参数使用错误',
            solution: 'key需要是函数，不是直接传字段名'
          },
          {
            error: '多条件排序优先级搞反',
            solution: '元组中越靠前的元素优先级越高'
          }
        ],
        
        tips: [
          '💡 可以用 operator.itemgetter 代替lambda，性能更好',
          '💡 可以实现并列排名的逻辑（分数相同名次相同）'
        ]
      }
    ]
  },
  
  {
    id: 3,
    title: '模拟购物结算',
    icon: '🛒',
    description: '实现购物车和结算功能，学习数据处理和流程控制',
    scenario: '你在开发一个购物网站的后台系统。需要实现商品展示、加入购物车、计算总价、应用折扣、最后生成订单的完整流程。',
    tasks: [
      {
        id: 'task1',
        title: '任务1：创建商品字典',
        
        objective: '学习使用字典存储和展示商品信息',
        
        knowledgePoints: [
          { name: '字典dict', desc: '键值对存储，适合存商品信息' },
          { name: 'products.items()', desc: '遍历字典的键值对' },
          { name: 'f-string格式化', desc: '方便地组合字符串和变量' },
          { name: 'def 函数', desc: '封装功能为可复用模块' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：设计商品数据结构',
            action: '每个商品需要什么信息',
            code: `# 商品应该包含：
# - id: 商品编号（方便查找）
# - name: 商品名称
# - price: 价格
# - stock: 库存数量

# 示例结构
sample_product = {
    'name': '笔记本电脑',
    'price': 4999,
    'stock': 10
}`,
            explanation: '先思考数据结构，再开始编码。用字典存储每个商品，字典的键作为商品ID。'
          },
          {
            stepTitle: '步骤2：创建完整商品字典',
            action: '创建多个商品',
            code: `products = {
    '001': {'name': '笔记本电脑', 'price': 4999, 'stock': 10},
    '002': {'name': '无线鼠标', 'price': 99, 'stock': 50},
    '003': {'name': '机械键盘', 'price': 299, 'stock': 30},
    '004': {'name': '显示器', 'price': 1299, 'stock': 15}
}

print("商品数量:", len(products))`,
            explanation: '这样的嵌套字典结构很清晰，通过商品ID可以快速找到对应商品。'
          },
          {
            stepTitle: '步骤3：定义显示商品的函数',
            action: '写一个函数来美观展示商品列表',
            code: `def display_products(products):
    print("=" * 50)
    print("           商品列表           ")
    print("=" * 50)
    print(f"{'ID':<6}{'商品名称':<15}{'价格':>8}{'库存':>8}")
    print("-" * 50)
    
    for pid, info in products.items():
        print(f"{pid:<6}{info['name']:<15}"
              f"{info['price']:>8.0f}元{info['stock']:>8}件")
    
    print("=" * 50)`,
            explanation: '使用字符串格式化，可以制作出对齐美观的表格。<表示左对齐，>表示右对齐，数字是宽度。'
          },
          {
            stepTitle: '步骤4：调用函数展示',
            action: '测试我们的展示函数',
            code: `if __name__ == '__main__':
    display_products(products)`,
            explanation: '把功能封装成函数后，调用就很方便了。'
          }
        ],
        
        codeTemplate: `# 商品字典
products = {
    '001': {'name': '笔记本电脑', 'price': 4999, 'stock': 10},
    '002': {'name': '无线鼠标', 'price': 99, 'stock': 50},
    '003': {'name': '机械键盘', 'price': 299, 'stock': 30},
    '004': {'name': '显示器', 'price': 1299, 'stock': 15}
}

def display_products(products):
    """显示商品列表"""
    print("=" * 50)
    print("           商品列表           ")
    print("=" * 50)
    print(f"{'ID':<6}{'商品名称':<15}{'价格':>8}{'库存':>8}")
    print("-" * 50)
    
    for pid, info in products.items():
        print(f"{pid:<6}{info['name']:<15}"
              f"{info['price']:>8.0f}元{info['stock']:>8}件")
    
    print("=" * 50)

if __name__ == '__main__':
    display_products(products)`,
        
        expectedOutput: `==================================================
           商品列表           
==================================================
ID    商品名称            价格      库存
--------------------------------------------------
001   笔记本电脑          4999元      10件
002   无线鼠标             99元      50件
003   机械键盘            299元      30件
004   显示器            1299元      15件
==================================================`,
        
        commonErrors: [
          {
            error: '忘记遍历items()只拿到了键',
            solution: '用 for key, value in dict.items() 同时获取键值'
          },
          {
            error: '字典键不存在导致KeyError',
            solution: '访问前可以用 if key in dict: 检查，或用dict.get()'
          },
          {
            error: '字符串格式对齐混乱',
            solution: '使用格式说明符 {content:width} 控制对齐'
          }
        ],
        
        tips: [
          '💡 可以用 tabulate 库做更漂亮的表格（需要安装）',
          '💡 可以添加分类、描述等更多商品信息'
        ]
      },
      
      {
        id: 'task2',
        title: '任务2：实现购物车结算',
        
        objective: '学习实现购物车添加、删除商品和价格计算',
        
        knowledgePoints: [
          { name: '购物车字典', desc: '键为商品ID，值为数量' },
          { name: '总价累加', desc: 'sum()或循环累加' },
          { name: '条件折扣', desc: 'if判断实现满减等逻辑' },
          { name: '多层字典访问', desc: 'products[pid][\'price\']' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：设计购物车数据结构',
            action: '购物车存什么',
            code: `# 购物车结构：商品ID -> 数量
cart = {
    '001': 1,  # 笔记本电脑 x1
    '003': 2   # 机械键盘 x2
}`,
            explanation: '购物车不需要存完整商品信息，只存ID和数量，通过ID去商品字典查详情。'
          },
          {
            stepTitle: '步骤2：计算购物车总价',
            action: '遍历购物车计算每项小计再累加',
            code: `def calculate_total(cart, products):
    total = 0
    for pid, quantity in cart.items():
        # 获取商品价格
        price = products[pid]['price']
        subtotal = price * quantity
        total += subtotal
        print(f"{products[pid]['name']} x {quantity} = ￥{subtotal}")
    
    return total`,
            explanation: '遍历购物车，根据商品ID查价格，计算每一项的小计，最后累加到总价。'
          },
          {
            stepTitle: '步骤3：添加折扣逻辑',
            action: '实现满减优惠',
            code: `def apply_discount(total):
    discount = 0
    # 满1000减100
    if total >= 1000:
        discount = (total // 1000) * 100
    # 可以添加更多折扣规则
    
    return discount`,
            explanation: '// 是整数除法，满几个1000就减几个100。可以叠加多个优惠规则。'
          },
          {
            stepTitle: '步骤4：整合结算函数',
            action: '把所有功能整合',
            code: `def checkout(cart, products):
    print("\\n" + "="*50)
    print("           结算清单           ")
    print("="*50)
    
    total = calculate_total(cart, products)
    discount = apply_discount(total)
    final = total - discount
    
    print("-" * 50)
    print(f"{'商品总价':<30}{total:>20.0f}元")
    if discount > 0:
        print(f"{'优惠减免':<30}-{discount:>19.0f}元")
    print("=" * 50)
    print(f"{'应付金额':<30}{final:>20.0f}元")
    
    return final`,
            explanation: '一个完整的结算过程包括：列清单、算总价、算优惠、显示结果。'
          }
        ],
        
        codeTemplate: `# 商品数据
products = {
    '001': {'name': '笔记本电脑', 'price': 4999, 'stock': 10},
    '002': {'name': '无线鼠标', 'price': 99, 'stock': 50},
    '003': {'name': '机械键盘', 'price': 299, 'stock': 30}
}

# 购物车
cart = {'001': 1, '003': 2}

def calculate_total(cart, products):
    """计算购物车总价"""
    total = 0
    for pid, quantity in cart.items():
        price = products[pid]['price']
        subtotal = price * quantity
        total += subtotal
        print(f"{products[pid]['name']} x {quantity} = ￥{subtotal}")
    return total

def apply_discount(total):
    """应用折扣：满1000减100"""
    if total >= 1000:
        return (total // 1000) * 100
    return 0

def checkout(cart, products):
    """结算购物车"""
    print("\\n" + "="*50)
    print("           结算清单           ")
    print("="*50)
    
    total = calculate_total(cart, products)
    discount = apply_discount(total)
    final = total - discount
    
    print("-" * 50)
    print(f"{'商品总价':<30}{total:>20.0f}元")
    if discount > 0:
        print(f"{'优惠减免':<30}-{discount:>19.0f}元")
    print("=" * 50)
    print(f"{'应付金额':<30}{final:>20.0f}元")

if __name__ == '__main__':
    checkout(cart, products)`,
        
        expectedOutput: `==================================================
           结算清单           
==================================================
笔记本电脑 x 1 = ￥4999
机械键盘 x 2 = ￥598
--------------------------------------------------
商品总价                              5597元
优惠减免                             -500元
==================================================
应付金额                              5097元`,
        
        commonErrors: [
          {
            error: '购物车的商品ID在products中不存在',
            solution: '查找前先检查 pid in products，避免KeyError'
          },
          {
            error: '金额计算用浮点数导致精度误差',
            solution: '金额建议用整数（分为单位）或decimal模块'
          },
          {
            error: '折扣计算逻辑错误',
            solution: '先写测试用例验证边界条件（刚好满1000）'
          }
        ],
        
        tips: [
          '💡 可以添加库存检查，购物车数量不能超过库存',
          '💡 可以实现会员价、优惠券等更复杂的促销'
        ]
      }
    ]
  },

  {
    id: 4,
    title: '人员信息排序',
    icon: '👥',
    description: '学习对包含多个字段的人员信息进行复杂排序',
    scenario: 'HR系统需要按照多个字段对员工进行排序：先按部门分组，同部门内按入职日期排序，同日期按姓名排序。',
    tasks: [
      {
        id: 'task1',
        title: '任务1：创建人员信息数据结构',
        
        objective: '学习使用字典列表存储人员信息，并按日期排序',
        
        knowledgePoints: [
          { name: '字典列表', desc: '列表中每个元素是一个字典' },
          { name: 'datetime模块', desc: '处理日期和时间' },
          { name: 'sorted()', desc: 'Python内置排序函数' },
          { name: 'lambda函数', desc: '指定排序关键字' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：导入datetime模块',
            action: '需要datetime来处理日期',
            code: 'from datetime import datetime\nprint("datetime模块导入成功!")',
            explanation: 'datetime模块提供了日期时间处理功能，可以解析字符串日期为日期对象进行比较。'
          },
          {
            stepTitle: '步骤2：创建人员数据',
            action: '用字典列表存储人员信息',
            code: `employees = [
    {'name': '张三', 'dept': '技术部', 'hire_date': '2022-01-15', 'salary': 15000},
    {'name': '李四', 'dept': '市场部', 'hire_date': '2021-06-20', 'salary': 12000},
    {'name': '王五', 'dept': '技术部', 'hire_date': '2022-03-10', 'salary': 14000}
]

print("员工数量:", len(employees))`,
            explanation: '每个人员是一个字典，包含姓名、部门、入职日期和薪资字段。列表适合存储多条记录。'
          },
          {
            stepTitle: '步骤3：解析日期字符串',
            action: '将字符串日期转换为datetime对象',
            code: `def parse_date(date_str):
    return datetime.strptime(date_str, '%Y-%m-%d')

# 测试解析
test_date = parse_date('2022-01-15')
print(f"解析结果: {test_date}")
print(f"日期类型: {type(test_date)}")`,
            explanation: 'strptime()将字符串解析为datetime对象，格式串%Y-%m-%d表示年-月-日。转换后才能正确比较日期大小。'
          },
          {
            stepTitle: '步骤4：按入职日期排序',
            action: '使用sorted和lambda按日期升序',
            code: `# 转换为包含解析后日期的新列表
employees_with_dates = []
for emp in employees:
    emp_copy = emp.copy()
    emp_copy['hire_date_obj'] = parse_date(emp['hire_date'])
    employees_with_dates.append(emp_copy)

# 按日期排序
sorted_employees = sorted(employees_with_dates, 
                          key=lambda x: x['hire_date_obj'])

print("\\n按入职日期排序:")
for emp in sorted_employees:
    print(f"{emp['hire_date']} - {emp['name']} ({emp['dept']})")`,
            explanation: 'lambda函数指定按hire_date_obj排序。这是日期对象，Python可以直接比较大小。'
          }
        ],
        
        codeTemplate: `from datetime import datetime

def parse_date(date_str):
    """将日期字符串解析为datetime对象"""
    return datetime.strptime(date_str, '%Y-%m-%d')

employees = [
    {'name': '张三', 'dept': '技术部', 'hire_date': '2022-01-15', 'salary': 15000},
    {'name': '李四', 'dept': '市场部', 'hire_date': '2021-06-20', 'salary': 12000},
    {'name': '王五', 'dept': '技术部', 'hire_date': '2022-03-10', 'salary': 14000}
]

def sort_employees(employees, by='date'):
    """按日期或薪资排序员工"""
    # 复制数据并添加解析后的日期对象
    result = []
    for emp in employees:
        emp_copy = emp.copy()
        emp_copy['hire_date_obj'] = parse_date(emp['hire_date'])
        result.append(emp_copy)
    
    if by == 'date':
        # 按入职日期升序
        return sorted(result, key=lambda x: x['hire_date_obj'])
    elif by == 'salary':
        # 按薪资降序
        return sorted(result, key=lambda x: x['salary'], reverse=True)
    return result

if __name__ == '__main__':
    print("按入职日期排序:")
    for emp in sort_employees(employees, by='date'):
        print(f"{emp['hire_date']} - {emp['name']} ({emp['dept']})")`,
        
        expectedOutput: `按入职日期排序:
2021-06-20 - 李四 (市场部)
2022-01-15 - 张三 (技术部)
2022-03-10 - 王五 (技术部)`,
        
        commonErrors: [
          {
            error: '直接比较字符串日期',
            solution: '字符串比较是字典序，必须转换为datetime对象'
          },
          {
            error: '修改了原始数据',
            solution: '在排序前复制字典'
          },
          {
            error: '忘记lambda的参数名',
            solution: 'lambda x: x["key"] 中的x代表列表的每个元素'
          }
        ],
        
        tips: [
          '💡 可以用 operator.itemgetter 代替lambda，多字段排序时性能更好',
          '💡 日期排序的元组技巧：key=lambda x: (-x[\'salary\'], x[\'name\'])'
        ]
      },
      
      {
        id: 'task2',
        title: '任务2：多条件综合排序',
        
        objective: '学习实现先按部门、再按日期、最后按姓名的多条件排序',
        
        knowledgePoints: [
          { name: '元组排序', desc: 'key返回元组时，按顺序比较各元素' },
          { name: '负数排序', desc: '-x实现降序效果' },
          { name: '字符串比较', desc: '中文字符串按拼音排序' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解多条件排序原理',
            action: 'key函数可以返回元组',
            code: `# 多条件排序的key函数示例
def multi_key_sort(item):
    # 返回元组：(优先字段, 次要字段, ...)
    return (item['dept'], item['hire_date_obj'])`,
            explanation: '元组比较是按顺序进行的。第一元素相等时才比较第二元素，依此类推。'
          },
          {
            stepTitle: '步骤2：实现部门+日期排序',
            action: '按部门分组，部门内按日期排序',
            code: `employees = [
    {'name': '张三', 'dept': '技术部', 'hire_date': '2022-01-15'},
    {'name': '李四', 'dept': '市场部', 'hire_date': '2021-06-20'},
    {'name': '王五', 'dept': '技术部', 'hire_date': '2022-03-10'},
    {'name': '赵六', 'dept': '市场部', 'hire_date': '2021-06-20'}
]

# 添加日期对象
for emp in employees:
    emp['hire_date_obj'] = datetime.strptime(emp['hire_date'], '%Y-%m-%d')

# 按部门、日期排序
sorted_emp = sorted(employees, key=lambda x: (x['dept'], x['hire_date_obj']))

print("按部门+日期排序:")
for emp in sorted_emp:
    print(f"{emp['dept']} | {emp['hire_date']} | {emp['name']}")`,
            explanation: '元组(x[\'dept\'], x[\'hire_date_obj\'])会先按部门排，相同部门再按日期排。'
          },
          {
            stepTitle: '步骤3：添加姓名作为第三条件',
            action: '同部门同日期再按姓名排序',
            code: `# 完整多条件排序
sorted_emp = sorted(employees, 
    key=lambda x: (x['dept'], x['hire_date_obj'], x['name']))

print("\\n完整排序 (部门+日期+姓名):")
for emp in sorted_emp:
    print(f"{emp['dept']} | {emp['hire_date']} | {emp['name']}")`,
            explanation: '添加姓名作为第三排序条件，当部门、日期都相同时，按姓名的拼音字母顺序排列。'
          }
        ],
        
        codeTemplate: `from datetime import datetime

def parse_date(date_str):
    """将日期字符串解析为datetime对象"""
    return datetime.strptime(date_str, '%Y-%m-%d')

employees = [
    {'name': '张三', 'dept': '技术部', 'hire_date': '2022-01-15'},
    {'name': '李四', 'dept': '市场部', 'hire_date': '2021-06-20'},
    {'name': '王五', 'dept': '技术部', 'hire_date': '2022-03-10'},
    {'name': '赵六', 'dept': '市场部', 'hire_date': '2021-06-20'}
]

def multi_sort_employees(employees):
    """多条件排序：部门升序、入职日期升序、姓名升序"""
    # 为每个员工添加解析后的日期对象
    result = []
    for emp in employees:
        emp_copy = emp.copy()
        emp_copy['hire_date_obj'] = parse_date(emp['hire_date'])
        result.append(emp_copy)
    
    # 多条件排序
    sorted_employees = sorted(result, key=lambda x: (
        x['dept'],           # 部门升序
        x['hire_date_obj'],  # 入职日期升序
        x['name']            # 姓名升序
    ))
    
    return sorted_employees

if __name__ == '__main__':
    for emp in multi_sort_employees(employees):
        print(f"{emp['dept']} | {emp['hire_date']} | {emp['name']}")`,
        
        expectedOutput: `市场部 | 2021-06-20 | 李四
市场部 | 2021-06-20 | 赵六
技术部 | 2022-01-15 | 张三
技术部 | 2022-03-10 | 王五`,
        
        commonErrors: [
          {
            error: '元组元素顺序错误',
            solution: '越重要的排序条件要放在元组前面'
          },
          {
            error: '混合升序降序时忘记负号',
            solution: '数值类型用-n实现降序'
          },
          {
            error: 'datetime和字符串比较混乱',
            solution: '统一转换为datetime对象后再排序'
          }
        ],
        
        tips: [
          '💡 中文排序可以用pypinyin库转换为拼音',
          '💡 pandas的sort_values()支持多列直接排序'
        ]
      }
    ]
  },

  {
    id: 5,
    title: '数据走势模拟',
    icon: '📈',
    description: '使用随机数模拟股票价格走势，学习数据生成和可视化',
    scenario: '你需要模拟股票价格走势数据，用于测试交易系统。生成包含开盘价、收盘价、最高价、最低价的数据。',
    tasks: [
      {
        id: 'task1',
        title: '任务1：生成模拟股票数据',
        
        objective: '学习使用随机数和循环生成金融数据',
        
        knowledgePoints: [
          { name: 'random.gauss()', desc: '生成服从正态分布的随机数' },
          { name: '列表追加', desc: 'append()方法向列表添加元素' },
          { name: '格式化输出', desc: '控制小数位数和宽度' },
          { name: 'for循环', desc: '重复生成多条数据' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解股票数据基本结构',
            action: '了解K线数据的OHLC格式',
            code: `# 每根K线包含:
# - Open (开盘价): 当天第一个成交价格
# - High (最高价): 当天最高成交价格
# - Low (最低价): 当天最低成交价格
# - Close (收盘价): 当天最后一个成交价格

print("一根K线的数据结构:")
kline = {'open': 100, 'high': 105, 'low': 98, 'close': 103}
print(kline)`,
            explanation: 'OHLC是金融数据的基本格式，包含了每天价格波动的关键信息。'
          },
          {
            stepTitle: '步骤2：使用随机游走生成价格',
            action: '今天价格 = 昨天价格 + 随机波动',
            code: `import random

def generate_price_series(start_price, days, volatility=0.02):
    """生成价格序列"""
    prices = [start_price]
    
    for _ in range(days):
        # 随机波动，正态分布
        change = random.gauss(0, volatility)
        new_price = prices[-1] * (1 + change)
        prices.append(new_price)
    
    return prices

# 生成30天数据
prices = generate_price_series(100, 30)
print("模拟价格走势 (前10天):")
for i, p in enumerate(prices[:10]):
    print(f"第{i}天: {p:.2f}元")`,
            explanation: '随机游走模型是模拟股价的经典方法。每天价格在昨天基础上随机波动，波动幅度用volatility控制。'
          },
          {
            stepTitle: '步骤3：生成完整OHLC数据',
            action: '为每天生成完整的OHLC数据',
            code: `def generate_klines(start_price, days, volatility=0.02):
    klines = []
    current_price = start_price
    
    for day in range(days):
        # 开盘价 = 前一天收盘价（或初始价）
        open_price = current_price
        
        # 日内波动
        high_factor = abs(random.gauss(0.005, volatility))
        low_factor = abs(random.gauss(0.005, volatility))
        
        # 计算最高、最低价
        high_price = open_price * (1 + high_factor)
        low_price = open_price * (1 - low_factor)
        
        # 收盘价
        close_factor = random.gauss(0, volatility)
        close_price = open_price * (1 + close_factor)
        
        # 确保OHLC逻辑正确
        high_price = max(open_price, close_price, high_price, low_price)
        low_price = min(open_price, close_price, high_price, low_price)
        
        klines.append({
            'day': day + 1,
            'open': open_price,
            'high': high_price,
            'low': low_price,
            'close': close_price
        })
        
        current_price = close_price
    
    return klines`,
            explanation: 'OHLC关系：high是四个价格中的最大值，low是最小值。这样保证K线图逻辑正确。'
          }
        ],
        
        codeTemplate: `import random

def generate_klines(start_price, days, volatility=0.02):
    """生成K线数据"""
    klines = []
    current_price = start_price
    
    for day in range(days):
        # 开盘价 = 前一天收盘价
        open_price = current_price
        
        # 日内波动
        high_factor = abs(random.gauss(0.005, volatility))
        low_factor = abs(random.gauss(0.005, volatility))
        
        # 计算最高、最低价
        high_price = open_price * (1 + high_factor)
        low_price = open_price * (1 - low_factor)
        
        # 收盘价
        close_factor = random.gauss(0, volatility)
        close_price = open_price * (1 + close_factor)
        
        # 确保OHLC逻辑正确
        high_price = max(open_price, close_price, high_price, low_price)
        low_price = min(open_price, close_price, high_price, low_price)
        
        klines.append({
            'day': day + 1,
            'open': open_price,
            'high': high_price,
            'low': low_price,
            'close': close_price
        })
        
        # 更新当前价格为收盘价
        current_price = close_price
    
    return klines

if __name__ == '__main__':
    # 生成10天的K线数据
    klines = generate_klines(100, 10)
    
    print("=" * 70)
    print(f"{'日期':<6} {'开盘':>10} {'最高':>10} {'最低':>10} {'收盘':>10}")
    print("=" * 70)
    
    for k in klines:
        print(f"第{k['day']:<3}天 "
              f"{k['open']:>10.2f} "
              f"{k['high']:>10.2f} "
              f"{k['low']:>10.2f} "
              f"{k['close']:>10.2f}")`,
        
        expectedOutput: `======================================================================
日期          开盘         最高         最低         收盘
======================================================================
第1天        100.00       102.35        98.12       101.56
第2天        101.56       103.89       100.23       102.78
第3天        102.78       104.56       101.45       103.21`,
        
        commonErrors: [
          {
            error: '最高价低于最低价',
            solution: '计算后用max/min确保 high >= low'
          },
          {
            error: '收盘价超出最高最低范围',
            solution: '收盘价一定在最高和最低之间'
          },
          {
            error: '波动过大导致价格异常',
            solution: '调整volatility参数，0.02表示2%的标准差'
          }
        ],
        
        tips: [
          '💡 可以用 matplotlib 绘制K线图',
          '💡 可以添加成交量(Volume)数据',
          '💡 实际股价有跳空缺口，可以模拟'
        ]
      },
      
      {
        id: 'task2',
        title: '任务2：计算技术指标',
        
        objective: '学习计算移动平均线和涨跌统计',
        
        knowledgePoints: [
          { name: '移动平均线MA', desc: 'N日收盘价的平均值' },
          { name: '列表切片', desc: 'list[-n:] 获取最后n个元素' },
          { name: 'sum()函数', desc: '计算总和' },
          { name: '条件统计', desc: '统计满足条件的数量' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：计算简单移动平均(SMA)',
            action: 'MA5 = 最近5天收盘价的平均值',
            code: `def calculate_sma(prices, period=5):
    """计算简单移动平均"""
    sma_values = []
    
    for i in range(len(prices)):
        if i < period - 1:
            sma_values.append(None)  # 数据不足时用None
        else:
            # 取最近period个价格
            period_prices = prices[i-period+1:i+1]
            sma = sum(period_prices) / period
            sma_values.append(sma)
    
    return sma_values

# 测试
closes = [100, 102, 101, 103, 105, 104, 106, 108, 107, 109]
sma5 = calculate_sma(closes, period=5)

print("收盘价 vs MA5:")
for i in range(len(closes)):
    if sma5[i] is None:
        print(f"第{i+1}天: {closes[i]:.2f} | MA5: --")
    else:
        print(f"第{i+1}天: {closes[i]:.2f} | MA5: {sma5[i]:.2f}")`,
            explanation: '移动平均线是技术分析的基础。MA5反映短期趋势，MA20、MA60反映中长期趋势。'
          },
          {
            stepTitle: '步骤2：计算涨跌统计',
            action: '统计上涨、下跌天数和最大涨幅',
            code: `def calculate_statistics(klines):
    """计算涨跌统计"""
    total_days = len(klines)
    up_days = 0
    down_days = 0
    max_up = 0
    max_down = 0
    
    for i in range(total_days):
        if i == 0:
            continue
        
        prev_close = klines[i-1]['close']
        curr_close = klines[i]['close']
        change_pct = (curr_close - prev_close) / prev_close * 100
        
        if change_pct > 0:
            up_days += 1
            max_up = max(max_up, change_pct)
        elif change_pct < 0:
            down_days += 1
            max_down = max(max_down, abs(change_pct))
    
    return {
        'total': total_days - 1,
        'up_days': up_days,
        'down_days': down_days,
        'max_up': max_up,
        'max_down': max_down
    }

# 测试
klines = generate_klines(100, 10)
stats = calculate_statistics(klines)

print("\\n涨跌统计:")
print(f"总交易日: {stats['total']}")
print(f"上涨天数: {stats['up_days']}")
print(f"下跌天数: {stats['down_days']}")
print(f"最大单日涨幅: {stats['max_up']:.2f}%")
print(f"最大单日跌幅: {stats['max_down']:.2f}%")`,
            explanation: '统计分析帮助了解价格走势的特征。盈亏比是交易策略的重要指标。'
          }
        ],
        
        codeTemplate: `import random

def generate_klines(start_price, days, volatility=0.02):
    """生成K线数据"""
    klines = []
    current_price = start_price
    
    for day in range(days):
        open_price = current_price
        high_factor = abs(random.gauss(0.005, volatility))
        low_factor = abs(random.gauss(0.005, volatility))
        high_price = max(open_price * (1 + high_factor), open_price)
        low_price = min(open_price * (1 - low_factor), open_price)
        close_factor = random.gauss(0, volatility)
        close_price = open_price * (1 + close_factor)
        high_price = max(high_price, close_price)
        low_price = min(low_price, close_price)
        
        klines.append({
            'day': day + 1,
            'open': open_price,
            'high': high_price,
            'low': low_price,
            'close': close_price
        })
        current_price = close_price
    
    return klines

def calculate_sma(klines, period=5):
    """计算简单移动平均线"""
    closes = [k['close'] for k in klines]
    sma_values = []
    
    for i in range(len(closes)):
        if i < period - 1:
            sma_values.append(None)
        else:
            period_prices = closes[i-period+1:i+1]
            sma = sum(period_prices) / period
            sma_values.append(sma)
    
    return sma_values

def calculate_statistics(klines):
    """计算涨跌统计"""
    total_days = len(klines)
    up_days = 0
    down_days = 0
    max_up = 0
    max_down = 0
    
    for i in range(1, total_days):
        prev_close = klines[i-1]['close']
        curr_close = klines[i]['close']
        change_pct = (curr_close - prev_close) / prev_close * 100
        
        if change_pct > 0:
            up_days += 1
            max_up = max(max_up, change_pct)
        elif change_pct < 0:
            down_days += 1
            max_down = max(max_down, abs(change_pct))
    
    return {
        'total': total_days - 1,
        'up_days': up_days,
        'down_days': down_days,
        'max_up': max_up,
        'max_down': max_down
    }

if __name__ == '__main__':
    klines = generate_klines(100, 10)
    sma = calculate_sma(klines, 5)
    stats = calculate_statistics(klines)
    
    print("收盘价 vs MA5:")
    for i, k in enumerate(klines):
        sma_val = f"{sma[i]:.2f}" if sma[i] else "--"
        print(f"第{i+1}天: {k['close']:.2f} | MA5: {sma_val}")
    
    print("\\n涨跌统计:")
    print(f"上涨天数: {stats['up_days']}, 下跌天数: {stats['down_days']}")`,
        
        expectedOutput: `收盘价 vs MA5:
第1天: 100.00 | MA5: --
第2天: 101.56 | MA5: --
第3天: 102.34 | MA5: --
第4天: 103.12 | MA5: --
第5天: 103.45 | MA5: 102.09
...

涨跌统计:
上涨天数: 6, 下跌天数: 3`,
        
        commonErrors: [
          {
            error: '循环边界错误导致索引越界',
            solution: '确保i-period+1 >= 0'
          },
          {
            error: '忘记处理第一天的特殊情况',
            solution: '第一天没有前一天，无法计算涨跌'
          },
          {
            error: '数据类型不统一',
            solution: '确保close字段都是数值类型'
          }
        ],
        
        tips: [
          '💡 可以实现MACD、RSI等技术指标',
          '💡 可以计算布林带(标准差通道)',
          '💡 移动平均可以加权(WMA)或指数平滑(EMA)'
        ]
      }
    ]
  },

  {
    id: 6,
    title: '概率模拟实验',
    icon: '🎲',
    description: '通过蒙特卡洛模拟学习概率论概念',
    scenario: '用代码模拟抛硬币、掷骰子等概率实验，验证概率论定理，如大数定律。',
    tasks: [
      {
        id: 'task1',
        title: '任务1：基础概率模拟',
        
        objective: '学习用随机数模拟抛硬币和掷骰子实验',
        
        knowledgePoints: [
          { name: 'random.random()', desc: '生成[0,1)区间的随机小数' },
          { name: '条件判断', desc: 'if-else实现概率事件' },
          { name: '列表计数', desc: 'count()统计特定值' },
          { name: '格式化输出', desc: 'f"{value:.2%}" 显示百分比' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解随机数的概率分布',
            action: 'random()生成[0,1)均匀分布',
            code: `import random

# random.random() 生成 [0, 1) 区间的数
print("10个随机数:")
for _ in range(10):
    print(random.random(), end=" ")

print("\\n\\n0-1随机数的含义:")
print("- 如果 < 0.5，可以认为是"正面"")
print("- 如果 >= 0.5，可以认为是"反面"")
print("- 每次概率正好是50%")`,
            explanation: 'uniform distribution均匀分布意味着每个数出现的概率相同。抛硬币可以用这个特性模拟。'
          },
          {
            stepTitle: '步骤2：模拟抛硬币',
            action: '实现一个抛硬币函数',
            code: `def flip_coin():
    """抛一次硬币，返回True为正面，False为反面"""
    return random.random() < 0.5

def simulate_flips(n):
    """模拟n次抛硬币"""
    heads = 0
    tails = 0
    
    for _ in range(n):
        if flip_coin():
            heads += 1
        else:
            tails += 1
    
    return heads, tails

# 测试
heads, tails = simulate_flips(1000)
print(f"抛1000次硬币:")
print(f"正面: {heads} ({heads/10:.1f}%)")
print(f"反面: {tails} ({tails/10:.1f}%)")
print(f"理论概率: 50.0%")`,
            explanation: 'flip_coin()返回布尔值。大量实验后，正面比例应该接近50%，这就是大数定律。'
          },
          {
            stepTitle: '步骤3：模拟掷骰子',
            action: '实现掷骰子函数，1-6随机整数',
            code: `def roll_dice():
    """掷一次骰子，返回1-6"""
    return random.randint(1, 6)

def simulate_dice(n):
    """模拟n次掷骰子，统计每个点数出现次数"""
    counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    
    for _ in range(n):
        result = roll_dice()
        counts[result] += 1
    
    return counts

# 测试
counts = simulate_dice(6000)
print("掷6000次骰子:")
print("点数 | 次数 | 频率 | 理论概率")
print("-" * 40)
for i in range(1, 7):
    pct = counts[i] / 6000 * 100
    print(f"  {i}   | {counts[i]:>4} | {pct:>5.2f}% | 16.67%")`,
            explanation: 'randint(1,6)生成1到6的整数，每个点数概率都是1/6 ≈ 16.67%。'
          }
        ],
        
        codeTemplate: `import random

def flip_coin():
    """抛一次硬币，返回True为正面"""
    return random.random() < 0.5

def roll_dice():
    """掷一次骰子，返回1-6"""
    return random.randint(1, 6)

def simulate_flips(n):
    """模拟n次抛硬币"""
    heads = 0
    tails = 0
    
    for _ in range(n):
        if flip_coin():
            heads += 1
        else:
            tails += 1
    
    return heads, tails

def simulate_dice(n):
    """模拟n次掷骰子"""
    counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    
    for _ in range(n):
        result = roll_dice()
        counts[result] += 1
    
    return counts

if __name__ == '__main__':
    # 模拟抛硬币
    heads, tails = simulate_flips(1000)
    print("抛1000次硬币:")
    print(f"正面: {heads} ({heads/10:.1f}%)")
    print(f"反面: {tails} ({tails/10:.1f}%)")
    print()
    
    # 模拟掷骰子
    counts = simulate_dice(600)
    print("掷600次骰子:")
    for i in range(1, 7):
        pct = counts[i] / 600 * 100
        print(f"  {i}点: {counts[i]}次 ({pct:.1f}%)")`,
        
        expectedOutput: `抛1000次硬币:
正面: 487 (48.7%)
反面: 513 (51.3%)

掷600次骰子:
  1点: 98次 (16.3%)
  2点: 105次 (17.5%)
  ...`,
        
        commonErrors: [
          {
            error: 'random()忘记<判断',
            solution: 'random()返回[0,1)，需要<0.5来判断正面'
          },
          {
            error: 'randint范围错误',
            solution: 'randint(1,6)包含两端点，注意不要写成(0,6)'
          },
          {
            error: '除以0',
            solution: '计算百分比时分母要大于0'
          }
        ],
        
        tips: [
          '💡 可以用 collections.Counter 更方便统计',
          '💡 模拟次数越多，结果越接近理论概率'
        ]
      },
      
      {
        id: 'task2',
        title: '任务2：验证大数定律',
        
        objective: '通过实验理解大数定律：样本数量越大，平均值越接近期望值',
        
        knowledgePoints: [
          { name: '累积平均', desc: '不断加入新样本计算平均' },
          { name: '列表追加', desc: 'append()记录过程' },
          { name: '理论期望', desc: 'E[X]概率加权和' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解期望值',
            action: '计算抛硬币和掷骰子的期望值',
            code: `# 抛硬币的期望值
# 正面=1, 反面=0
# E = 0.5 * 0 + 0.5 * 1 = 0.5

coin_expected = 0.5
print(f"抛硬币的期望值: {coin_expected}")

# 掷骰子的期望值
# 每个点数1-6，概率都是1/6
# E = (1+2+3+4+5+6) / 6 = 3.5
dice_expected = sum(range(1, 7)) / 6
print(f"掷骰子的期望值: {dice_expected}")`,
            explanation: '期望值是所有可能值的加权平均。大量实验后，样本均值会趋近期望值。'
          },
          {
            stepTitle: '步骤2：记录累积平均值',
            action: '模拟10000次，逐步记录累积平均',
            code: `def simulate_coin_average(max_flips):
    """模拟多次，记录累积平均值"""
    total = 0
    averages = []
    
    for i in range(1, max_flips + 1):
        # 抛一次: 1为正面，0为反面
        result = 1 if random.random() < 0.5 else 0
        total += result
        avg = total / i
        averages.append(avg)
    
    return averages

# 模拟10000次
print("模拟抛硬币10000次，观察平均值变化:")
averages = simulate_coin_average(10000)

# 显示关键节点的累积平均
checkpoints = [10, 50, 100, 500, 1000, 5000, 10000]
print("\\n样本数 | 累积平均 | 期望值")
print("-" * 30)
for n in checkpoints:
    print(f"{n:>6} | {averages[n-1]:>8.4f} | 0.5000")`,
            explanation: '可以看到，样本数越大，累积平均越接近0.5。这就是大数定律。'
          }
        ],
        
        codeTemplate: `import random

def simulate_cumulative_average(max_flips):
    """模拟并记录累积平均"""
    total = 0
    averages = []
    
    for i in range(1, max_flips + 1):
        # 抛一次硬币: 1为正面，0为反面
        result = 1 if random.random() < 0.5 else 0
        total += result
        avg = total / i
        averages.append(avg)
    
    return averages

def run_experiment(sample_size):
    """一次实验，返回平均值"""
    total = 0
    for _ in range(sample_size):
        total += 1 if random.random() < 0.5 else 0
    return total / sample_size

if __name__ == '__main__':
    # 模拟大数定律
    print("大数定律演示 - 抛硬币:")
    averages = simulate_cumulative_average(1000)
    
    checkpoints = [10, 50, 100, 500, 1000]
    print("\\n样本数 | 累积平均 | 与0.5的差距")
    print("-" * 40)
    for n in checkpoints:
        avg = averages[n-1]
        diff = abs(avg - 0.5)
        print(f"{n:>6} | {avg:>8.4f} | {diff:.4f}")
    
    print("\\n10次实验对比 (样本量=100):")
    for i in range(10):
        avg = run_experiment(100)
        print(f"  实验{i+1}: {avg:.4f}")`,
        
        expectedOutput: `大数定律演示 - 抛硬币:

样本数 | 累积平均 | 与0.5的差距
----------------------------------------
    10 |  0.6000 | 0.1000
    50 |  0.5200 | 0.0200
   100 |  0.4900 | 0.0100
   500 |  0.5020 | 0.0020
  1000 |  0.5080 | 0.0080

10次实验对比 (样本量=100):
  实验1: 0.5100
  实验2: 0.4700
  ...`,
        
        commonErrors: [
          {
            error: '忘记累积',
            solution: '每次要加到total上，而不是覆盖'
          },
          {
            error: '除法时机错误',
            solution: '除以当前样本数i，而不是总数'
          },
          {
            error: '忘记初始化',
            solution: 'total要初始化为0'
          }
        ],
        
        tips: [
          '💡 可以同时模拟多个随机过程',
          '💡 中心极限定理：大量随机变量之和趋向正态分布',
          '💡 可以用numpy一次性生成大量随机数'
        ]
      }
    ]
  },

  {
    id: 7,
    title: '日历生成工具',
    icon: '📅',
    description: '学习datetime模块，生成日历和日期计算',
    scenario: '你需要开发一个日历工具，可以显示某年某月的日历，计算任意两天之间的天数差。',
    tasks: [
      {
        id: 'task1',
        title: '任务1：判断星期和生成月历',
        
        objective: '学习datetime模块判断星期几，生成月历',
        
        knowledgePoints: [
          { name: 'datetime.date()', desc: '创建日期对象' },
          { name: 'weekday()', desc: '返回星期几，0=周一' },
          { name: 'calendar.monthrange()', desc: '返回某月第一天是周几和天数' },
          { name: '字符串格式化', desc: '对齐和宽度控制' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解Python的星期表示',
            action: 'Python用0-6表示星期几',
            code: `from datetime import date

# weekday() 返回:
# 0 = Monday (周一)
# 1 = Tuesday (周二)
# ...
# 5 = Saturday (周六)
# 6 = Sunday (周日)

print("Python的星期表示:")
days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
for i, day in enumerate(days):
    print(f"{i} -> {day}")

# 测试一些日期
test_dates = [
    date(2024, 1, 1),   # 元旦
    date(2024, 5, 1),   # 劳动节
    date(2024, 10, 1),  # 国庆节
]

print("\\n测试日期的星期:")
for d in test_dates:
    weekday = d.weekday()
    print(f"{d} 是 {days[weekday]}")`,
            explanation: 'weekday()返回0-6，周一到周日。注意与isoweekday()的区别，后者1=周一，7=周日。'
          },
          {
            stepTitle: '步骤2：获取某月的天数和起始星期',
            action: '使用calendar模块计算月历',
            code: `import calendar

year = 2024
month = 3

# monthrange(year, month) 返回:
# (weekday, days) - weekday是第一天是周几，days是这个月的天数
weekday, days = calendar.monthrange(year, month)

print(f"{year}年{month}月:")
print(f"第一天是: {['一','二','三','四','五','六','日'][weekday]}")
print(f"总天数: {days}天")`,
            explanation: 'monthrange()让我们知道这个月从星期几开始，有多少天，这样就能正确布局日历。'
          },
          {
            stepTitle: '步骤3：生成月历字符串',
            action: '用字符串拼接出完整的月历',
            code: `def print_month(year, month):
    """打印某月日历"""
    days_name = ['一', '二', '三', '四', '五', '六', '日']
    
    # 打印表头
    print("=" * 20)
    print(f"   {year}年{month}月")
    print("=" * 20)
    print(' '.join(f"{d:>2}" for d in days_name))
    
    # 获取月信息
    first_weekday, total_days = calendar.monthrange(year, month)
    
    # 打印空白和日期
    line = ""
    for _ in range(first_weekday):
        line += "   "  # 空白占位
    
    for day in range(1, total_days + 1):
        line += f"{day:>2} "
        if (first_weekday + day) % 7 == 0:
            print(line)
            line = ""
    
    if line:
        print(line)

# 测试
print_month(2024, 3)`,
            explanation: '每月1号前需要填充空白。每满7天换一行，最后一行不足7天也要打印。'
          }
        ],
        
        codeTemplate: `import calendar

def print_month(year, month):
    """打印某月日历"""
    days_name = ['一', '二', '三', '四', '五', '六', '日']
    
    # 打印表头
    print("=" * 22)
    print(f"      {year}年{month}月")
    print("=" * 22)
    print(' '.join(f"{d:>2}" for d in days_name))
    
    # 获取该月信息
    first_weekday, total_days = calendar.monthrange(year, month)
    
    # 打印空白和日期
    line = ""
    for _ in range(first_weekday):
        line += "    "  # 空白占位
    
    for day in range(1, total_days + 1):
        line += f"{day:>2} "
        if (first_weekday + day) % 7 == 0:
            print(line)
            line = ""
    
    if line:
        print(line)

if __name__ == '__main__':
    print_month(2024, 3)`,
        
        expectedOutput: `======================
      2024年3月
======================
 一 二 三 四 五 六 日
          1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 29 30 31`,
        
        commonErrors: [
          {
            error: '月份范围1-12写错',
            solution: 'monthrange(y, m)的m必须是1-12'
          },
          {
            error: '空白对齐不对齐',
            solution: '每个空白要和日期宽度一致'
          },
          {
            error: '换行时机错误',
            solution: '(first_weekday + day) % 7 == 0 时换行'
          }
        ],
        
        tips: [
          '💡 可以用tabulate库生成更漂亮的表格',
          '💡 突出显示周末和节假日'
        ]
      },
      
      {
        id: 'task2',
        title: '任务2：日期计算功能',
        
        objective: '学习计算日期差、判断闰年等日期操作',
        
        knowledgePoints: [
          { name: 'date.today()', desc: '获取当前日期' },
          { name: '日期减法', desc: 'date2 - date1 返回天数差' },
          { name: 'calendar.isleap()', desc: '判断是否闰年' },
          { name: 'timedelta', desc: '日期加减时间增量' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：计算两个日期之间的天数',
            action: '日期相减得到天数差',
            code: `from datetime import date

def days_between(date1_str, date2_str):
    """计算两个日期之间的天数"""
    # 解析日期字符串 "2024-01-01"
    y1, m1, d1 = map(int, date1_str.split('-'))
    y2, m2, d2 = map(int, date2_str.split('-'))
    
    d1 = date(y1, m1, d1)
    d2 = date(y2, m2, d2)
    
    # 日期相减返回timedelta对象
    diff = d2 - d1
    return abs(diff.days)

# 测试
date1 = "2024-01-01"
date2 = "2024-12-31"

days = days_between(date1, date2)
print(f"{date1} 到 {date2} 相隔 {days} 天")`,
            explanation: '两个date对象相减，返回timedelta，其days属性就是相隔天数。abs()取绝对值。'
          },
          {
            stepTitle: '步骤2：判断闰年',
            action: '使用calendar.isleap()判断',
            code: `import calendar

def is_leap_year(year):
    """判断是否闰年"""
    return calendar.isleap(year)

# 闰年规则:
# 能被4整除但不能被100整除
# 或者能被400整除

print("判断闰年:")
test_years = [2020, 2024, 1900, 2000, 2100]
for y in test_years:
    result = is_leap_year(y)
    print(f"{y}年: {'是闰年' if result else '不是闰年'}")`,
            explanation: '闰年2月有29天，全年366天。记住口诀：四年一闰，百年不闰，四百年又闰。'
          },
          {
            stepTitle: '步骤3：日期加减',
            action: '使用timedelta进行日期计算',
            code: `from datetime import date, timedelta

# 当前日期
today = date.today()
print(f"今天是: {today}")

# 100天后是几号？
days_100 = today + timedelta(days=100)
print(f"100天后是: {days_100}")

# 30天前是几号？
days_30_ago = today - timedelta(days=30)
print(f"30天前是: {days_30_ago}")`,
            explanation: 'timedelta表示时间增量，可以加到date上得到新日期。支持days、weeks等参数。'
          }
        ],
        
        codeTemplate: `from datetime import date, timedelta
import calendar

def days_between(date1_str, date2_str):
    """计算两个日期之间的天数"""
    # 解析日期字符串
    y1, m1, d1 = map(int, date1_str.split('-'))
    y2, m2, d2 = map(int, date2_str.split('-'))
    
    d1 = date(y1, m1, d1)
    d2 = date(y2, m2, d2)
    
    # 日期相减返回天数差
    diff = d2 - d1
    return abs(diff.days)

def is_leap_year(year):
    """判断是否闰年"""
    return calendar.isleap(year)

def get_future_date(start_date_str, days):
    """计算days天后的日期"""
    y, m, d = map(int, start_date_str.split('-'))
    start = date(y, m, d)
    future = start + timedelta(days=days)
    return future

if __name__ == '__main__':
    print("闰年判断:")
    for y in [2020, 2024, 1900, 2000]:
        print(f"  {y}年: {'是' if is_leap_year(y) else '不是'}闰年")
    
    print("\\n日期计算:")
    print(f"  2024-01-01到2024-12-31相隔: {days_between('2024-01-01', '2024-12-31')}天")
    print(f"  2024-01-01后100天: {get_future_date('2024-01-01', 100)}")`,
        
        expectedOutput: `闰年判断:
  2020年: 是闰年
  2024年: 是闰年
  1900年: 不是闰年
  2000年: 是闰年

日期计算:
  2024-01-01到2024-12-31相隔: 365天
  2024-01-01后100天: 2024-04-10`,
        
        commonErrors: [
          {
            error: '日期字符串格式错误',
            solution: '确保是YYYY-MM-DD格式'
          },
          {
            error: '忘记处理负数天数',
            solution: '用abs()取绝对值'
          },
          {
            error: '闰年判断逻辑错误',
            solution: '使用calendar.isleap()更可靠'
          }
        ],
        
        tips: [
          '💡 dateutil库提供更强大的日期解析',
          '💡 可以计算工作日排除周末和节假日'
        ]
      }
    ]
  },

  {
    id: 8,
    title: '字符串处理工具',
    icon: '🔤',
    description: '学习Python字符串处理，实现文本分析和格式化',
    scenario: '你需要开发一个文本分析工具，统计字符数、单词数、出现频率最高的词等。',
    tasks: [
      {
        id: 'task1',
        title: '任务1：文本基础统计',
        
        objective: '学习字符串基本操作和统计方法',
        
        knowledgePoints: [
          { name: 'len()', desc: '计算字符串长度' },
          { name: 'split()', desc: '分割字符串为列表' },
          { name: 'strip()', desc: '去除首尾空白' },
          { name: 'lower()/upper()', desc: '大小写转换' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解字符串的基本属性',
            action: '查看字符串的长度和内容',
            code: `text = "Hello, World! Python is amazing."

print("字符串基本信息:")
print(f"字符数: {len(text)}")
print(f"单词数: {len(text.split())}")
print(f"首字母大写: {text.capitalize()}")
print(f"全部小写: {text.lower()}")
print(f"全部大写: {text.upper()}")`,
            explanation: 'len()统计字符数（包括空格和标点），split()按空格分割统计单词数。'
          },
          {
            stepTitle: '步骤2：清洗和规范化文本',
            action: '去除标点、统一大小写',
            code: `import string

def clean_text(text):
    """清洗文本：去除标点，转小写"""
    # 去除标点
    translator = str.maketrans('', '', string.punctuation)
    cleaned = text.translate(translator)
    
    # 转小写
    cleaned = cleaned.lower()
    
    # 去除多余空格
    cleaned = ' '.join(cleaned.split())
    
    return cleaned

text = "Hello, World! Python is amazing. Let's learn together!"
cleaned = clean_text(text)

print("原文:", text)
print("\\n清洗后:", cleaned)
print(f"单词数: {len(cleaned.split())}")`,
            explanation: '清洗文本是分析前的必要步骤。去除标点、统一大小写、去多余空格。'
          },
          {
            stepTitle: '步骤3：统计词频',
            action: '统计每个单词出现的次数',
            code: `def word_frequency(text):
    """统计词频"""
    cleaned = clean_text(text)
    words = cleaned.split()
    
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1
    
    return freq

text = """
Python Python Python is is is great great
Java Java is also popular popular popular
"""

freq = word_frequency(text)
print("词频统计:")
for word, count in sorted(freq.items(), key=lambda x: -x[1]):
    print(f"  {word}: {count}次")`,
            explanation: '字典的get(key, default)方法安全获取值，避免KeyError。排序用key=lambda x: -x[1]降序。'
          }
        ],
        
        codeTemplate: `import string

def clean_text(text):
    """清洗文本：去除标点，转小写，去多余空格"""
    # 去除标点
    translator = str.maketrans('', '', string.punctuation)
    cleaned = text.translate(translator)
    # 转小写
    cleaned = cleaned.lower()
    # 去除多余空格
    cleaned = ' '.join(cleaned.split())
    return cleaned

def word_frequency(text):
    """统计词频"""
    cleaned = clean_text(text)
    words = cleaned.split()
    
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1
    
    return freq

if __name__ == '__main__':
    text = "Hello, World! Python is amazing. Python is great. Python is Python."
    
    print("原始文本:", text)
    print(f"字符数: {len(text)}")
    print(f"单词数: {len(clean_text(text).split())}")
    
    print("\\n词频统计:")
    freq = word_frequency(text)
    for word, count in sorted(freq.items(), key=lambda x: -x[1]):
        print(f"  {word}: {count}次")`,
        
        expectedOutput: `原始文本: Hello, World! Python is amazing. Python is great. Python is Python.
字符数: 72
单词数: 10

词频统计:
  python: 4次
  is: 3次
  amazing: 1次
  great: 1次
  hello: 1次
  world: 1次`,
        
        commonErrors: [
          {
            error: 'split()没有参数会按所有空白分割',
            solution: 'split()默认按空格、换行、制表符分割'
          },
          {
            error: '大小写混淆导致统计错误',
            solution: '统一转小写后再统计'
          },
          {
            error: '标点没有去除',
            solution: '使用string.punctuation或手动replace'
          }
        ],
        
        tips: [
          '💡 可以用collections.Counter更简洁统计',
          '💡 可以用正则表达式re处理更复杂的文本'
        ]
      },
      
      {
        id: 'task2',
        title: '任务2：文本搜索和替换',
        
        objective: '学习字符串搜索、替换和正则表达式基础',
        
        knowledgePoints: [
          { name: 'find()', desc: '查找子串位置，找不到返回-1' },
          { name: 'count()', desc: '统计子串出现次数' },
          { name: 'replace()', desc: '替换子串' },
          { name: '正则表达式', desc: 're模块实现模式匹配' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：基础字符串搜索',
            action: '查找子串的位置和出现次数',
            code: `text = "Python is a great programming language. Python is easy to learn."

# 查找子串位置
pos = text.find("Python")
print(f"'Python'第一次出现在位置: {pos}")

pos2 = text.find("Python", pos + 1)
print(f"'Python'第二次出现在位置: {pos2}")

# 统计出现次数
count = text.count("Python")
print(f"'Python'出现次数: {count}")

# 是否包含某子串
contains = "Java" in text
print(f"是否包含'Java': {contains}")`,
            explanation: 'find()返回第一次出现的位置，找不到返回-1。count()直接统计次数。in操作符检查包含关系。'
          },
          {
            stepTitle: '步骤2：字符串替换',
            action: '使用replace()替换文本',
            code: `text = "Python is a great programming language. Python is great."

# 基本替换
new_text = text.replace("Python", "Java")
print("替换后:", new_text)

# 指定替换次数（只替换前n次）
partial = text.replace("great", "awesome", 1)
print("只替换1次:", partial)`,
            explanation: 'replace()默认替换所有出现，可以指定第三个参数限制次数。返回新字符串，原字符串不变。'
          },
          {
            stepTitle: '步骤3：正则表达式入门',
            action: '使用re模块进行模式匹配',
            code: `import re

text = "我的邮箱是 test@163.com，他的邮箱是 hello@gmail.com"

# 查找所有邮箱
pattern = r'\\w+@\\w+\\.\\w+'
emails = re.findall(pattern, text)
print("找到的邮箱:", emails)

# 替换数字为占位符
masked = re.sub(r'\\d+', '***', "订单号: 12345, 金额: 678元")
print("脱敏后:", masked)`,
            explanation: '正则表达式是强大的文本匹配工具。\\w+匹配字母数字下划线，\\d+匹配数字。re.findall返回所有匹配。'
          }
        ],
        
        codeTemplate: `import re

def extract_emails(text):
    """从文本中提取邮箱地址"""
    pattern = r'\\w+@\\w+\\.\\w+'
    emails = re.findall(pattern, text)
    return emails

def extract_phones(text):
    """提取手机号（假设是11位数字）"""
    pattern = r'1[3-9]\\d{9}'
    phones = re.findall(pattern, text)
    return phones

def mask_sensitive(text):
    """脱敏处理，隐藏数字"""
    masked = re.sub(r'\\d+', '***', text)
    return masked

if __name__ == '__main__':
    text = "邮箱: test@163.com, 电话: 13812345678"
    
    print("原文:", text)
    print("提取的邮箱:", extract_emails(text))
    print("提取的电话:", extract_phones(text))
    print("脱敏后:", mask_sensitive(text))`,
        
        expectedOutput: `原文: 邮箱: test@163.com, 电话: 13812345678
提取的邮箱: ['test@163.com']
提取的电话: ['13812345678']
脱敏后: 邮箱: ***@***.***, 电话: ***`,
        
        commonErrors: [
          {
            error: '正则表达式写错导致匹配失败',
            solution: '常见错误：转义符、字符集边界'
          },
          {
            error: 'findall和search混淆',
            solution: 'findall返回列表，search返回第一个匹配对象'
          },
          {
            error: 'replace不生效',
            solution: '字符串不可变，replace返回新字符串'
          }
        ],
        
        tips: [
          '💡 在线正则测试工具很有用',
          '💡 raw string (r"...") 避免转义问题'
        ]
      }
    ]
  },

  {
    id: 9,
    title: '数据纠错校验',
    icon: '✓',
    description: '学习数据校验方法，实现常见的校验算法',
    scenario: '需要实现数据校验功能，验证身份证号、手机号、银行卡号的合法性。',
    tasks: [
      {
        id: 'task1',
        title: '任务1：校验位算法',
        
        objective: '学习常见的校验位算法原理和实现',
        
        knowledgePoints: [
          { name: '字符串索引', desc: 's[i]访问第i个字符' },
          { name: 'isdigit()', desc: '判断是否全为数字' },
          { name: '循环遍历', desc: 'for i in range()遍历' },
          { name: '取模运算', desc: '%运算符求余数' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解校验位原理',
            action: '了解什么是校验位，为什么需要校验',
            code: `# 校验位的作用:
# - 检测数据在传输/录入过程中的错误
# - 通过数学算法计算出校验位
# - 验证时重新计算，与存储的校验位对比
# - 不一致则说明数据有误

print("校验位算法示例:")
print("- 银行卡最后一位是校验位")
print("- 身份证最后一位可能是X")`,
            explanation: '校验位是附加在原数据后面的一个数字或字符，根据原数据计算得出，用于验证数据正确性。'
          },
          {
            stepTitle: '步骤2：实现Luhn算法',
            action: 'Luhn算法是银行卡校验的标准',
            code: `def luhn_checksum(card_number):
    """Luhn算法校验银行卡号"""
    def digits_of(n):
        return [int(d) for d in str(n)]
    
    digits = digits_of(card_number)
    odd_digits = digits[-1::-2]  # 从最后一位开始，奇数位
    even_digits = digits[-2::-2] # 偶数位
    
    # 奇数位直接相加
    checksum = sum(odd_digits)
    
    # 偶数位乘2，超过9则减9
    for d in even_digits:
        checksum += sum(digits_of(d * 2))
    
    return checksum % 10 == 0

# 测试
test_numbers = [
    "4532015112830366",  # 有效的Visa卡号
    "4532015112830367",  # 改动最后一位
]

print("Luhn算法测试:")
for num in test_numbers:
    result = luhn_checksum(num)
    print(f"{num}: {'有效' if result else '无效'}")`,
            explanation: 'Luhn算法：奇数位直接加，偶数位乘2后相加，最后能被10整除就是有效的银行卡号。'
          },
          {
            stepTitle: '步骤3：校验手机号格式',
            action: '验证中国手机号的合法性',
            code: `import re

def validate_phone(phone):
    """校验中国手机号"""
    # 规则: 11位数字，以1开头，第二位是3-9
    pattern = r'^1[3-9]\\d{9}$'
    return bool(re.match(pattern, phone))

# 测试
phones = ["13812345678", "12345678901", "1381234567", "10012345678"]
print("手机号校验:")
for p in phones:
    result = validate_phone(p)
    print(f"  {p}: {'有效' if result else '无效'}")`,
            explanation: '中国手机号有固定格式：11位，1开头，第二位3-9。可以进一步校验号段。'
          }
        ],
        
        codeTemplate: `import re

def luhn_checksum(card_number):
    """Luhn算法校验银行卡号"""
    def digits_of(n):
        return [int(d) for d in str(n)]
    
    digits = digits_of(card_number)
    odd_digits = digits[-1::-2]  # 从最后一位开始，奇数位
    even_digits = digits[-2::-2] # 偶数位
    
    # 奇数位直接相加
    checksum = sum(odd_digits)
    
    # 偶数位乘2，超过9则减9
    for d in even_digits:
        checksum += sum(digits_of(d * 2))
    
    return checksum % 10 == 0

def validate_phone(phone):
    """校验中国手机号"""
    pattern = r'^1[3-9]\\d{9}$'
    return bool(re.match(pattern, phone))

if __name__ == '__main__':
    # 测试银行卡
    print("银行卡校验:")
    for card in ["4532015112830366", "1234567890123456"]:
        print(f"  {card}: {'有效' if luhn_checksum(card) else '无效'}")
    
    # 测试手机号
    print("\\n手机号校验:")
    for phone in ["13812345678", "12345678901", "10012345678"]:
        print(f"  {phone}: {'有效' if validate_phone(phone) else '无效'}")`,
        
        expectedOutput: `银行卡校验:
  4532015112830366: 有效
  1234567890123456: 无效

手机号校验:
  13812345678: 有效
  12345678901: 无效
  10012345678: 无效`,
        
        commonErrors: [
          {
            error: '字符串转数字时包含非数字字符',
            solution: '先用isdigit()检查'
          },
          {
            error: '索引越界',
            solution: '确保字符串长度符合要求再访问'
          },
          {
            error: '奇偶位判断错误',
            solution: '从右向左数，最右边是第1位(奇数位)'
          }
        ],
        
        tips: [
          '💡 可以用正则表达式简化校验逻辑',
          '💡 真实身份证校验涉及地区、生日、性别'
        ]
      },
      
      {
        id: 'task2',
        title: '任务2：ISBN书号校验',
        
        objective: '学习ISBN-10和ISBN-13的校验算法',
        
        knowledgePoints: [
          { name: 'ISBN-10', desc: '旧版10位书号，最后一位是校验位' },
          { name: 'ISBN-13', desc: '新版13位书号，类似EAN-13' },
          { name: '加权求和', desc: '乘以权重后求和' },
          { name: 'chr/ord', desc: '字符与ASCII码转换' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解ISBN-10校验',
            action: '学习ISBN-10的校验算法',
            code: `# ISBN-10校验算法:
# 1. 前9位每位的权重分别是10,9,8,...,2
# 2. 各位数字乘以权重后求和
# 3. 加上校验位(0-9或X对应10)
# 4. 总和必须能被11整除

def validate_isbn10(isbn):
    """校验ISBN-10"""
    isbn = isbn.replace('-', '').replace(' ', '')
    
    if len(isbn) != 10:
        return False, "长度必须为10位"
    
    total = 0
    for i in range(9):
        if not isbn[i].isdigit():
            return False, "前9位必须是数字"
        total += int(isbn[i]) * (10 - i)
    
    # 最后一位可以是数字或X
    last = isbn[9]
    if last == 'X':
        total += 10
    elif last.isdigit():
        total += int(last)
    else:
        return False, "最后一位必须是数字或X"
    
    return total % 11 == 0, "有效" if total % 11 == 0 else "无效"

# 测试
test_isbns = ["0201314525", "080442961X"]
for isbn in test_isbns:
    valid, msg = validate_isbn10(isbn)
    print(f"{isbn}: {msg}")`,
            explanation: 'ISBN-10校验：权重10-2，前9位乘权重相加，加校验位后能被11整除。X代表10。'
          },
          {
            stepTitle: '步骤2：理解ISBN-13校验',
            action: '学习ISBN-13的校验算法',
            code: `# ISBN-13校验算法:
# 1. 所有13位参与计算
# 2. 奇数位权重1，偶数位权重3
# 3. 加权求和必须能被10整除

def validate_isbn13(isbn):
    """校验ISBN-13"""
    isbn = isbn.replace('-', '').replace(' ', '')
    
    if len(isbn) != 13 or not isbn.isdigit():
        return False, "长度必须为13位且全是数字"
    
    total = 0
    for i in range(13):
        digit = int(isbn[i])
        if i % 2 == 0:
            total += digit * 1
        else:
            total += digit * 3
    
    return total % 10 == 0, "有效" if total % 10 == 0 else "无效"

# 测试
test_isbns = ["9789861334483", "9787121186418"]
for isbn in test_isbns:
    valid, msg = validate_isbn13(isbn)
    print(f"{isbn}: {msg}")`,
            explanation: 'ISBN-13是欧洲商品编号(EAN-13)的扩展，权重1和3交替。加权求和能被10整除即为有效。'
          }
        ],
        
        codeTemplate: `def validate_isbn10(isbn):
    """校验ISBN-10"""
    isbn = isbn.replace('-', '').replace(' ', '')
    
    if len(isbn) != 10:
        return False
    
    total = 0
    for i in range(9):
        if not isbn[i].isdigit():
            return False
        total += int(isbn[i]) * (10 - i)
    
    last = isbn[9]
    if last == 'X':
        total += 10
    elif last.isdigit():
        total += int(last)
    else:
        return False
    
    return total % 11 == 0

def validate_isbn13(isbn):
    """校验ISBN-13"""
    isbn = isbn.replace('-', '').replace(' ', '')
    
    if len(isbn) != 13 or not isbn.isdigit():
        return False
    
    total = 0
    for i in range(13):
        digit = int(isbn[i])
        if i % 2 == 0:
            total += digit * 1
        else:
            total += digit * 3
    
    return total % 10 == 0

if __name__ == '__main__':
    print("ISBN-10校验:")
    for isbn in ["0201314525", "080442961X", "1234567890"]:
        print(f"  {isbn}: {'有效' if validate_isbn10(isbn) else '无效'}")
    
    print("\\nISBN-13校验:")
    for isbn in ["9789861334483", "9787121186418", "1234567890123"]:
        print(f"  {isbn}: {'有效' if validate_isbn13(isbn) else '无效'}")`,
        
        expectedOutput: `ISBN-10校验:
  0201314525: 有效
  080442961X: 有效
  1234567890: 无效

ISBN-13校验:
  9789861334483: 有效
  9787121186418: 无效
  1234567890123: 无效`,
        
        commonErrors: [
          {
            error: '权重计算错误',
            solution: 'ISBN-10权重是10-2，ISBN-13是1和3交替'
          },
          {
            error: 'X的值处理错误',
            solution: 'ISBN-10的X代表10，不是0'
          },
          {
            error: '余数计算错误',
            solution: 'ISBN-10用11取模，ISBN-13用10取模'
          }
        ],
        
        tips: [
          '💡 可以用python isbnlib库处理ISBN',
          '💡 真实ISBN校验还应查询数据库验证'
        ]
      }
    ]
  },

  {
    id: 10,
    title: '数组数据拼接',
    icon: '🔗',
    description: '学习数组的合并、拼接和重组操作',
    scenario: '你需要将多个数据数组合并，按特定规则拼接，实现数据整理功能。',
    tasks: [
      {
        id: 'task1',
        title: '任务1：数组合并操作',
        
        objective: '学习列表的合并、追加和扩展操作',
        
        knowledgePoints: [
          { name: '+ 运算符', desc: '连接两个列表' },
          { name: 'extend()', desc: '扩展列表' },
          { name: 'append()', desc: '追加单个元素' },
          { name: '列表推导式', desc: '[x for x in ...]快速构建' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解列表拼接的三种方式',
            action: '比较+、extend()和append()的区别',
            code: `list1 = [1, 2, 3]
list2 = [4, 5, 6]

# 方式1: + 运算符 (返回新列表)
combined1 = list1 + list2
print(f"list1 + list2 = {combined1}")
print(f"list1不变: {list1}")

# 方式2: extend() (原地扩展)
list1_copy = list1.copy()
list1_copy.extend(list2)
print(f"list1.extend(list2) = {list1_copy}")

# 方式3: append() (追加为子列表)
list1_copy = list1.copy()
list1_copy.append(list2)
print(f"list1.append(list2) = {list1_copy}")`,
            explanation: '+ 返回新列表不改变原列表；extend()原地扩展；append()把整个列表当一个元素追加。'
          },
          {
            stepTitle: '步骤2：合并多个数组',
            action: '合并多个数据源的数组',
            code: `def merge_arrays(*arrays):
    """合并多个数组"""
    result = []
    for arr in arrays:
        result.extend(arr)
    return result

# 模拟来自不同班级的学生名单
class1 = ["张三", "李四", "王五"]
class2 = ["赵六", "钱七"]
class3 = ["孙八", "周九", "吴十"]

all_students = merge_arrays(class1, class2, class3)
print("合并后的学生名单:")
for i, name in enumerate(all_students, 1):
    print(f"{i}. {name}")`,
            explanation: '*arrays接受可变数量的参数，可以传入任意多个数组进行合并。'
          },
          {
            stepTitle: '步骤3：按条件合并数组',
            action: '合并时过滤或转换数据',
            code: `# 合并并去重
def merge_unique(*arrays):
    """合并数组并去重"""
    result = []
    seen = set()
    
    for arr in arrays:
        for item in arr:
            if item not in seen:
                seen.add(item)
                result.append(item)
    
    return result

# 模拟不同来源的数据
source1 = [101, 102, 103, 104]
source2 = [103, 104, 105, 106]

unique = merge_unique(source1, source2)
print(f"去重合并: {unique}")`,
            explanation: '使用set记录已见过的元素，实现去重。保持原有顺序。'
          }
        ],
        
        codeTemplate: `def merge_arrays(*arrays):
    """合并多个数组"""
    result = []
    for arr in arrays:
        result.extend(arr)
    return result

def merge_unique(*arrays):
    """合并数组并去重"""
    result = []
    seen = set()
    
    for arr in arrays:
        for item in arr:
            if item not in seen:
                seen.add(item)
                result.append(item)
    
    return result

def interleave(*arrays):
    """交错合并多个数组"""
    result = []
    max_len = max(len(arr) for arr in arrays)
    
    for i in range(max_len):
        for arr in arrays:
            if i < len(arr):
                result.append(arr[i])
    
    return result

if __name__ == '__main__':
    a = [1, 2, 3]
    b = [4, 5, 6]
    c = [7, 8, 9]
    
    print("合并:", merge_arrays(a, b, c))
    print("去重合并:", merge_unique([1,2,3], [2,3,4], [3,4,5]))
    print("交错合并:", interleave(a, b))`,
        
        expectedOutput: `合并: [1, 2, 3, 4, 5, 6, 7, 8, 9]
去重合并: [1, 2, 3, 4, 5]
交错合并: [1, 4, 2, 5, 3, 6]`,
        
        commonErrors: [
          {
            error: 'append和extend混淆',
            solution: 'extend是逐个添加元素，append是添加整个对象'
          },
          {
            error: '去重后顺序变了',
            solution: '用set去重时要保持顺序'
          },
          {
            error: '越界访问',
            solution: '访问前检查 i < len(arr)'
          }
        ],
        
        tips: [
          '💡 sum(arrays, [])也可以合并，但效率低',
          '💡 用itertools.chain更优雅'
        ]
      },
      
      {
        id: 'task2',
        title: '任务2：二维数组操作',
        
        objective: '学习二维数组的拼接、转置和重组',
        
        knowledgePoints: [
          { name: '嵌套列表', desc: '列表的列表，类似矩阵' },
          { name: '列表索引', desc: 'matrix[i][j]访问元素' },
          { name: 'zip()', desc: '打包多个列表' },
          { name: '矩阵转置', desc: '行列互换' }
        ],
        
        detailedSteps: [
          {
            stepTitle: '步骤1：理解二维数组结构',
            action: '创建和访问二维数组',
            code: `# 二维数组：列表的列表
# matrix[row][col]

matrix = [
    [1, 2, 3],  # 第0行
    [4, 5, 6],  # 第1行
    [7, 8, 9]   # 第2行
]

print("3x3矩阵:")
for row in matrix:
    print(row)

print("\\n按行列访问:")
print(f"matrix[0][0] = {matrix[0][0]}")
print(f"matrix[1][2] = {matrix[1][2]}")`,
            explanation: 'matrix[i]是第i行，matrix[i][j]是第i行第j列的元素。用两个索引访问。'
          },
          {
            stepTitle: '步骤2：矩阵转置',
            action: '将矩阵的行列互换',
            code: `def transpose(matrix):
    """矩阵转置: 行变列，列变行"""
    # 使用zip转置
    return [list(row) for row in zip(*matrix)]

# 测试
original = [
    [1, 2, 3],
    [4, 5, 6]
]

transposed = transpose(original)
print("原始矩阵 (2x3):")
for row in original:
    print(row)

print("\\n转置后 (3x2):")
for row in transposed:
    print(row)`,
            explanation: 'zip(*matrix)先用*解包成zip(a,b,c...)，再用zip打包成(a[i],b[i],c[i]...)，即转置。'
          },
          {
            stepTitle: '步骤3：拼接多个矩阵',
            action: '水平或垂直拼接矩阵',
            code: `def concatenate_matrix(matrix1, matrix2, axis=0):
    """拼接两个矩阵"""
    if axis == 0:  # 垂直拼接（行方向）
        return [row.copy() for row in matrix1] + [row.copy() for row in matrix2]
    else:          # 水平拼接（列方向）
        result = []
        for i in range(len(matrix1)):
            result.append(matrix1[i] + matrix2[i])
        return result

# 测试
mat1 = [[1, 2], [3, 4]]
mat2 = [[5, 6], [7, 8]]

print("垂直拼接:")
for row in concatenate_matrix(mat1, mat2, axis=0):
    print(row)

print("\\n水平拼接:")
for row in concatenate_matrix(mat1, mat2, axis=1):
    print(row)`,
            explanation: 'axis=0沿行方向拼接（增加行），axis=1沿列方向拼接（增加列）。注意维度要匹配。'
          }
        ],
        
        codeTemplate: `def transpose(matrix):
    """矩阵转置"""
    return [list(row) for row in zip(*matrix)]

def concatenate(matrix1, matrix2, axis=0):
    """拼接两个矩阵"""
    if axis == 0:  # 垂直拼接
        return [row.copy() for row in matrix1] + [row.copy() for row in matrix2]
    else:           # 水平拼接
        result = []
        for i in range(len(matrix1)):
            result.append(matrix1[i] + matrix2[i])
        return result

if __name__ == '__main__':
    m1 = [[1, 2], [3, 4]]
    m2 = [[5, 6], [7, 8]]
    
    print("矩阵1:")
    for row in m1:
        print(f"  {row}")
    
    print("\\n转置后:")
    for row in transpose(m1):
        print(f"  {row}")
    
    print("\\n垂直拼接:")
    for row in concatenate(m1, m2, axis=0):
        print(f"  {row}")
    
    print("\\n水平拼接:")
    for row in concatenate(m1, m2, axis=1):
        print(f"  {row}")`,
        
        expectedOutput: `矩阵1:
  [1, 2]
  [3, 4]

转置后:
  [1, 3]
  [2, 4]

垂直拼接:
  [1, 2]
  [3, 4]
  [5, 6]
  [7, 8]

水平拼接:
  [1, 2, 5, 6]
  [3, 4, 7, 8]`,
        
        commonErrors: [
          {
            error: '行列维度不匹配',
            solution: '拼接前检查维度是否兼容'
          },
          {
            error: '修改了原矩阵',
            solution: '使用copy()或生成新矩阵'
          },
          {
            error: 'zip返回元组不是列表',
            solution: '需要 list(map(list, zip(...)))'
          }
        ],
        
        tips: [
          '💡 numpy的ndarray是更强大的矩阵工具',
          '💡 pandas的DataFrame是表格数据的利器'
        ]
      }
    ]
  }
]
