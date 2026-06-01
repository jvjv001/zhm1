// 编程项目数据
export const projectsData = [
  {
    id: 1,
    title: '猜数字小游戏',
    icon: '🎮',
    description: '实现经典的猜数字游戏，锻炼逻辑思维和循环控制能力',
    tasks: [
      {
        id: 'task1',
        title: '任务1：生成随机数',
        objective: '学习使用random模块生成指定范围内的随机数',
        hint: '使用random.randint()函数',
        steps: [
          '1. 导入random模块',
          '2. 使用randint()生成1-100之间的随机数作为答案',
          '3. 打印提示信息告诉用户游戏开始'
        ],
        code: `# TODO: 导入random模块
import random

def generate_random_number():
    # TODO: 生成1-100之间的随机整数
    secret_number = 0
    return secret_number

if __name__ == '__main__':
    secret = generate_random_number()
    print(f"随机数已生成: {secret}")`,
        answer: `import random

def generate_random_number():
    # 生成1-100之间的随机整数
    secret_number = random.randint(1, 100)
    return secret_number

if __name__ == '__main__':
    secret = generate_random_number()
    print(f"随机数已生成: {secret}")`,
        expected: '输出一个1-100之间的随机整数',
        commonErrors: [
          '忘记导入random模块',
          'randint()参数顺序错误',
          '函数没有返回值'
        ]
      },
      {
        id: 'task2',
        title: '任务2：实现猜数字逻辑',
        objective: '学习使用循环和条件判断实现游戏逻辑',
        hint: '使用while循环和if-elif-else条件判断',
        steps: [
          '1. 使用while循环实现游戏持续进行',
          '2. 获取用户输入的猜测数字',
          '3. 使用条件判断比较猜测与答案',
          '4. 根据比较结果给出提示（大了/小了/正确）'
        ],
        code: `# TODO: 实现猜数字游戏完整逻辑
import random

def guess_number_game():
    secret_number = random.randint(1, 100)
    attempts = 0
    
    print("欢迎来到猜数字游戏!")
    print("我已经想好了一个1-100之间的数字。")
    
    while True:
        # TODO: 获取用户输入
        guess = 0
        attempts += 1
        
        # TODO: 比较猜测与答案并给出提示
        # 如果猜大了，提示"太大了!"
        # 如果猜小了，提示"太小了!"
        # 如果猜对了，恭喜用户并退出循环
        
        if guess == secret_number:
            print(f"🎉 恭喜! 你用了{attempts}次猜对了!")
            break

if __name__ == '__main__':
    guess_number_game()`,
        answer: `import random

def guess_number_game():
    secret_number = random.randint(1, 100)
    attempts = 0
    
    print("欢迎来到猜数字游戏!")
    print("我已经想好了一个1-100之间的数字。")
    
    while True:
        # 获取用户输入
        guess = int(input("请输入你的猜测: "))
        attempts += 1
        
        # 比较猜测与答案并给出提示
        if guess > secret_number:
            print("太大了! 再试试。")
        elif guess < secret_number:
            print("太小了! 再试试。")
        else:
            print(f"🎉 恭喜! 你用了{attempts}次猜对了!")
            break

if __name__ == '__main__':
    guess_number_game()`,
        expected: '一个完整的猜数字游戏，可以循环猜测直到猜对',
        commonErrors: [
          '忘记将输入转换为整数',
          '条件判断逻辑错误',
          '循环缺少退出条件'
        ]
      }
    ]
  },
  {
    id: 2,
    title: '排行榜排序实现',
    icon: '🏆',
    description: '学习使用不同排序算法实现排行榜功能',
    tasks: [
      {
        id: 'task1',
        title: '任务1：冒泡排序',
        objective: '学习冒泡排序算法的实现',
        hint: '使用双重循环进行相邻元素比较交换',
        steps: [
          '1. 定义待排序的分数列表',
          '2. 使用外层循环控制排序轮数',
          '3. 使用内层循环进行相邻元素比较',
          '4. 如果前一个元素大于后一个，交换位置'
        ],
        code: `# TODO: 实现冒泡排序

def bubble_sort(scores):
    n = len(scores)
    
    # TODO: 外层循环控制排序轮数
    for i in range(n):
        # TODO: 内层循环进行相邻比较
        for j in range(n - i - 1):
            # TODO: 如果前一个大于后一个，交换位置
            pass
    return scores

if __name__ == '__main__':
    scores = [85, 92, 78, 90, 88, 76, 95, 82]
    sorted_scores = bubble_sort(scores)
    print("排序后的分数:", sorted_scores)`,
        answer: `def bubble_sort(scores):
    n = len(scores)
    
    # 外层循环控制排序轮数
    for i in range(n):
        # 内层循环进行相邻比较
        for j in range(n - i - 1):
            # 如果前一个大于后一个，交换位置
            if scores[j] > scores[j + 1]:
                scores[j], scores[j + 1] = scores[j + 1], scores[j]
    return scores

if __name__ == '__main__':
    scores = [85, 92, 78, 90, 88, 76, 95, 82]
    sorted_scores = bubble_sort(scores)
    print("排序后的分数:", sorted_scores)`,
        expected: '输出从小到大排序后的分数列表',
        commonErrors: [
          '内层循环范围错误',
          '忘记交换元素',
          '循环次数过多'
        ]
      },
      {
        id: 'task2',
        title: '任务2：带姓名的排行榜',
        objective: '学习对复杂数据结构进行排序',
        hint: '使用列表嵌套字典存储选手信息',
        steps: [
          '1. 创建包含姓名和分数的列表',
          '2. 使用sorted()函数进行排序',
          '3. 指定key参数按分数排序',
          '4. 按降序排列并显示排行榜'
        ],
        code: `# TODO: 实现带姓名的排行榜

def create_ranking(players):
    # TODO: 使用sorted()按分数降序排序
    sorted_players = []
    
    # TODO: 打印排行榜
    print("🏆 排行榜")
    for i, player in enumerate(sorted_players, 1):
        print(f"第{i}名: {player['name']} - {player['score']}分")

if __name__ == '__main__':
    players = [
        {'name': '小明', 'score': 85},
        {'name': '小红', 'score': 92},
        {'name': '小刚', 'score': 78},
        {'name': '小美', 'score': 90}
    ]
    create_ranking(players)`,
        answer: `def create_ranking(players):
    # 使用sorted()按分数降序排序
    sorted_players = sorted(players, key=lambda x: x['score'], reverse=True)
    
    # 打印排行榜
    print("🏆 排行榜")
    for i, player in enumerate(sorted_players, 1):
        print(f"第{i}名: {player['name']} - {player['score']}分")

if __name__ == '__main__':
    players = [
        {'name': '小明', 'score': 85},
        {'name': '小红', 'score': 92},
        {'name': '小刚', 'score': 78},
        {'name': '小美', 'score': 90}
    ]
    create_ranking(players)`,
        expected: '按分数从高到低显示排行榜',
        commonErrors: [
          'key参数使用错误',
          '忘记设置reverse=True',
          '索引从0开始而不是1'
        ]
      }
    ]
  },
  {
    id: 3,
    title: '模拟购物结算',
    icon: '🛒',
    description: '实现购物车和结算功能，学习数据处理和流程控制',
    tasks: [
      {
        id: 'task1',
        title: '任务1：创建商品列表',
        objective: '学习使用字典存储商品信息',
        hint: '使用字典存储商品名称、价格、库存',
        steps: [
          '1. 创建商品字典，包含名称、价格、库存',
          '2. 打印商品列表供用户选择',
          '3. 实现简单的商品查找功能'
        ],
        code: `# TODO: 创建商品列表

# TODO: 创建商品字典
products = {
    # 格式: '商品ID': {'name': '名称', 'price': 价格, 'stock': 库存}
}

def display_products():
    print("=== 商品列表 ===")
    # TODO: 遍历商品并打印
    for pid, info in products.items():
        print(f"{pid}. {info['name']} - ￥{info['price']} (库存: {info['stock']})")

if __name__ == '__main__':
    products = {
        '001': {'name': '笔记本电脑', 'price': 4999, 'stock': 10},
        '002': {'name': '无线鼠标', 'price': 99, 'stock': 50},
        '003': {'name': '机械键盘', 'price': 299, 'stock': 30},
        '004': {'name': '显示器', 'price': 1299, 'stock': 15}
    }
    display_products()`,
        answer: `# 创建商品列表

def display_products(products):
    print("=== 商品列表 ===")
    # 遍历商品并打印
    for pid, info in products.items():
        print(f"{pid}. {info['name']} - ￥{info['price']} (库存: {info['stock']})")

if __name__ == '__main__':
    products = {
        '001': {'name': '笔记本电脑', 'price': 4999, 'stock': 10},
        '002': {'name': '无线鼠标', 'price': 99, 'stock': 50},
        '003': {'name': '机械键盘', 'price': 299, 'stock': 30},
        '004': {'name': '显示器', 'price': 1299, 'stock': 15}
    }
    display_products(products)`,
        expected: '显示商品列表，包含商品ID、名称、价格和库存',
        commonErrors: [
          '字典键值访问错误',
          '忘记传入参数',
          '字符串格式化错误'
        ]
      },
      {
        id: 'task2',
        title: '任务2：实现购物车结算',
        objective: '学习实现购物车添加、删除和结算功能',
        hint: '使用列表存储购物车商品，字典记录数量',
        steps: [
          '1. 创建购物车字典存储商品和数量',
          '2. 实现添加商品到购物车',
          '3. 计算总价和折扣',
          '4. 显示结算清单'
        ],
        code: `# TODO: 实现购物车结算功能

def checkout(cart, products):
    total = 0
    print("\\n=== 结算清单 ===")
    
    # TODO: 遍历购物车计算总价
    for pid, quantity in cart.items():
        # TODO: 获取商品信息
        product = products[pid]
        subtotal = product['price'] * quantity
        total += subtotal
        print(f"{product['name']} x {quantity} = ￥{subtotal}")
    
    # TODO: 应用折扣（满1000减100）
    discount = 0
    if total >= 1000:
        discount = total // 1000 * 100
    
    final_total = total - discount
    print(f"\\n原价: ￥{total}")
    print(f"优惠: ￥{discount}")
    print(f"应付: ￥{final_total}")

if __name__ == '__main__':
    products = {
        '001': {'name': '笔记本电脑', 'price': 4999, 'stock': 10},
        '002': {'name': '无线鼠标', 'price': 99, 'stock': 50},
        '003': {'name': '机械键盘', 'price': 299, 'stock': 30}
    }
    cart = {'001': 1, '003': 2}
    checkout(cart, products)`,
        answer: `def checkout(cart, products):
    total = 0
    print("\\n=== 结算清单 ===")
    
    # 遍历购物车计算总价
    for pid, quantity in cart.items():
        # 获取商品信息
        product = products[pid]
        subtotal = product['price'] * quantity
        total += subtotal
        print(f"{product['name']} x {quantity} = ￥{subtotal}")
    
    # 应用折扣（满1000减100）
    discount = total // 1000 * 100
    
    final_total = total - discount
    print(f"\\n原价: ￥{total}")
    print(f"优惠: ￥{discount}")
    print(f"应付: ￥{final_total}")

if __name__ == '__main__':
    products = {
        '001': {'name': '笔记本电脑', 'price': 4999, 'stock': 10},
        '002': {'name': '无线鼠标', 'price': 99, 'stock': 50},
        '003': {'name': '机械键盘', 'price': 299, 'stock': 30}
    }
    cart = {'001': 1, '003': 2}
    checkout(cart, products)`,
        expected: '显示购物车结算清单，包含折扣计算',
        commonErrors: [
          '字典键不存在导致KeyError',
          '折扣计算逻辑错误',
          '变量未初始化'
        ]
      }
    ]
  },
  {
    id: 4,
    title: '人员信息排序',
    icon: '👥',
    description: '学习对人员信息进行多条件排序和筛选',
    tasks: [
      {
        id: 'task1',
        title: '任务1：按年龄排序',
        objective: '学习按单一条件对人员列表排序',
        hint: '使用sorted()函数和lambda表达式',
        steps: [
          '1. 创建人员信息列表',
          '2. 使用sorted()按年龄排序',
          '3. 分别实现升序和降序排序'
        ],
        code: `# TODO: 按年龄排序人员列表

def sort_by_age(people, ascending=True):
    # TODO: 使用sorted()按年龄排序
    sorted_people = []
    return sorted_people

if __name__ == '__main__':
    people = [
        {'name': '张三', 'age': 28, 'department': '技术部'},
        {'name': '李四', 'age': 35, 'department': '市场部'},
        {'name': '王五', 'age': 22, 'department': '人事部'},
        {'name': '赵六', 'age': 31, 'department': '技术部'}
    ]
    
    print("按年龄升序:")
    for p in sort_by_age(people):
        print(f"{p['name']} - {p['age']}岁")
    
    print("\\n按年龄降序:")
    for p in sort_by_age(people, ascending=False):
        print(f"{p['name']} - {p['age']}岁")`,
        answer: `def sort_by_age(people, ascending=True):
    # 使用sorted()按年龄排序
    sorted_people = sorted(people, key=lambda x: x['age'], reverse=not ascending)
    return sorted_people

if __name__ == '__main__':
    people = [
        {'name': '张三', 'age': 28, 'department': '技术部'},
        {'name': '李四', 'age': 35, 'department': '市场部'},
        {'name': '王五', 'age': 22, 'department': '人事部'},
        {'name': '赵六', 'age': 31, 'department': '技术部'}
    ]
    
    print("按年龄升序:")
    for p in sort_by_age(people):
        print(f"{p['name']} - {p['age']}岁")
    
    print("\\n按年龄降序:")
    for p in sort_by_age(people, ascending=False):
        print(f"{p['name']} - {p['age']}岁")`,
        expected: '分别按年龄升序和降序显示人员列表',
        commonErrors: [
          'lambda表达式语法错误',
          'reverse参数逻辑错误',
          '忘记返回排序结果'
        ]
      },
      {
        id: 'task2',
        title: '任务2：多条件排序',
        objective: '学习按多个条件进行排序',
        hint: '使用元组作为key参数',
        steps: [
          '1. 先按部门分组',
          '2. 同一部门内按年龄排序',
          '3. 使用元组实现多条件排序'
        ],
        code: `# TODO: 多条件排序

def sort_by_dept_and_age(people):
    # TODO: 先按部门排序，再按年龄排序
    sorted_people = []
    return sorted_people

if __name__ == '__main__':
    people = [
        {'name': '张三', 'age': 28, 'department': '技术部'},
        {'name': '李四', 'age': 35, 'department': '市场部'},
        {'name': '王五', 'age': 22, 'department': '人事部'},
        {'name': '赵六', 'age': 31, 'department': '技术部'},
        {'name': '钱七', 'age': 29, 'department': '市场部'}
    ]
    
    print("按部门和年龄排序:")
    for p in sort_by_dept_and_age(people):
        print(f"{p['department']} - {p['name']} - {p['age']}岁")`,
        answer: `def sort_by_dept_and_age(people):
    # 先按部门排序，再按年龄排序
    sorted_people = sorted(people, key=lambda x: (x['department'], x['age']))
    return sorted_people

if __name__ == '__main__':
    people = [
        {'name': '张三', 'age': 28, 'department': '技术部'},
        {'name': '李四', 'age': 35, 'department': '市场部'},
        {'name': '王五', 'age': 22, 'department': '人事部'},
        {'name': '赵六', 'age': 31, 'department': '技术部'},
        {'name': '钱七', 'age': 29, 'department': '市场部'}
    ]
    
    print("按部门和年龄排序:")
    for p in sort_by_dept_and_age(people):
        print(f"{p['department']} - {p['name']} - {p['age']}岁")`,
        expected: '按部门分组显示，同一部门内按年龄升序排列',
        commonErrors: [
          '元组使用错误',
          '排序优先级错误',
          '缺少必要的key'
        ]
      }
    ]
  },
  {
    id: 5,
    title: '数据走势模拟',
    icon: '📈',
    description: '学习模拟数据走势，理解数据变化规律',
    tasks: [
      {
        id: 'task1',
        title: '任务1：生成随机走势',
        objective: '学习生成模拟数据走势',
        hint: '使用random模块生成随机变化',
        steps: [
          '1. 设置初始值',
          '2. 使用循环生成连续的数据点',
          '3. 每次迭代根据随机因子变化',
          '4. 确保数据在合理范围内'
        ],
        code: `# TODO: 生成随机数据走势
import random

def generate_trend(days=30, initial=100):
    trend = []
    current = initial
    
    for day in range(days):
        # TODO: 生成随机变化（-5到+5之间）
        change = 0
        current += change
        
        # TODO: 确保数据在合理范围（50-150）
        if current < 50:
            current = 50
        if current > 150:
            current = 150
        
        trend.append(current)
    
    return trend

if __name__ == '__main__':
    trend = generate_trend()
    print("30天数据走势:")
    for i, value in enumerate(trend, 1):
        print(f"第{i}天: {value:.1f}")`,
        answer: `import random

def generate_trend(days=30, initial=100):
    trend = []
    current = initial
    
    for day in range(days):
        # 生成随机变化（-5到+5之间）
        change = random.randint(-5, 5)
        current += change
        
        # 确保数据在合理范围（50-150）
        if current < 50:
            current = 50
        if current > 150:
            current = 150
        
        trend.append(current)
    
    return trend

if __name__ == '__main__':
    trend = generate_trend()
    print("30天数据走势:")
    for i, value in enumerate(trend, 1):
        print(f"第{i}天: {value:.1f}")`,
        expected: '生成30天的随机数据走势',
        commonErrors: [
          'random.randint()参数错误',
          '边界检查逻辑错误',
          '浮点数精度问题'
        ]
      },
      {
        id: 'task2',
        title: '任务2：分析走势特征',
        objective: '学习分析数据走势的统计特征',
        hint: '使用内置函数计算统计量',
        steps: [
          '1. 计算最大值和最小值',
          '2. 计算平均值',
          '3. 找出最高点和最低点的位置',
          '4. 分析整体趋势（上升/下降/平稳）'
        ],
        code: `# TODO: 分析走势特征
import random

def analyze_trend(trend):
    # TODO: 计算统计特征
    max_val = 0
    min_val = 0
    avg_val = 0
    
    # TODO: 找出最高和最低的位置
    max_day = 0
    min_day = 0
    
    for i, val in enumerate(trend):
        if val > max_val:
            max_val = val
            max_day = i + 1
        if val < min_val:
            min_val = val
            min_day = i + 1
    
    # TODO: 判断整体趋势
    first = trend[0]
    last = trend[-1]
    trend_direction = ""
    if last > first * 1.05:
        trend_direction = "上升"
    elif last < first * 0.95:
        trend_direction = "下降"
    else:
        trend_direction = "平稳"
    
    print(f"最大值: {max_val:.1f} (第{max_day}天)")
    print(f"最小值: {min_val:.1f} (第{min_day}天)")
    print(f"平均值: {avg_val:.1f}")
    print(f"整体趋势: {trend_direction}")

if __name__ == '__main__':
    trend = [100, 102, 98, 105, 103, 108, 105, 110, 108, 112]
    analyze_trend(trend)`,
        answer: `import random

def analyze_trend(trend):
    # 计算统计特征
    max_val = max(trend)
    min_val = min(trend)
    avg_val = sum(trend) / len(trend)
    
    # 找出最高和最低的位置
    max_day = trend.index(max_val) + 1
    min_day = trend.index(min_val) + 1
    
    # 判断整体趋势
    first = trend[0]
    last = trend[-1]
    trend_direction = ""
    if last > first * 1.05:
        trend_direction = "上升"
    elif last < first * 0.95:
        trend_direction = "下降"
    else:
        trend_direction = "平稳"
    
    print(f"最大值: {max_val:.1f} (第{max_day}天)")
    print(f"最小值: {min_val:.1f} (第{min_day}天)")
    print(f"平均值: {avg_val:.1f}")
    print(f"整体趋势: {trend_direction}")

if __name__ == '__main__':
    trend = [100, 102, 98, 105, 103, 108, 105, 110, 108, 112]
    analyze_trend(trend)`,
        expected: '输出走势的统计特征分析',
        commonErrors: [
          '列表索引从0开始而非1',
          '除法结果为整数而非浮点数',
          '趋势判断阈值设置不合理'
        ]
      }
    ]
  },
  {
    id: 6,
    title: '概率模拟实验',
    icon: '🎲',
    description: '学习通过模拟实验理解概率概念',
    tasks: [
      {
        id: 'task1',
        title: '任务1：抛硬币实验',
        objective: '学习模拟抛硬币并统计正反面概率',
        hint: '使用random.choice()模拟随机选择',
        steps: [
          '1. 定义实验次数',
          '2. 使用循环模拟抛硬币',
          '3. 统计正面和反面次数',
          '4. 计算概率并输出'
        ],
        code: `# TODO: 抛硬币概率实验
import random

def coin_flip_experiment(trials=1000):
    heads = 0
    tails = 0
    
    for _ in range(trials):
        # TODO: 模拟抛硬币
        result = ""
        if result == "heads":
            heads += 1
        else:
            tails += 1
    
    # TODO: 计算概率
    heads_prob = 0
    tails_prob = 0
    
    print(f"抛硬币{trials}次结果:")
    print(f"正面: {heads}次 ({heads_prob:.2%})")
    print(f"反面: {tails}次 ({tails_prob:.2%})")

if __name__ == '__main__':
    coin_flip_experiment()`,
        answer: `import random

def coin_flip_experiment(trials=1000):
    heads = 0
    tails = 0
    
    for _ in range(trials):
        # 模拟抛硬币
        result = random.choice(["heads", "tails"])
        if result == "heads":
            heads += 1
        else:
            tails += 1
    
    # 计算概率
    heads_prob = heads / trials
    tails_prob = tails / trials
    
    print(f"抛硬币{trials}次结果:")
    print(f"正面: {heads}次 ({heads_prob:.2%})")
    print(f"反面: {tails}次 ({tails_prob:.2%})")

if __name__ == '__main__':
    coin_flip_experiment()`,
        expected: '输出抛硬币实验的统计结果',
        commonErrors: [
          '忘记导入random模块',
          '除法结果为整数',
          '百分比格式化错误'
        ]
      },
      {
        id: 'task2',
        title: '任务2：骰子点数分布',
        objective: '学习模拟骰子投掷并分析点数分布',
        hint: '使用random.randint()生成骰子点数',
        steps: [
          '1. 模拟多次投掷骰子',
          '2. 统计每个点数出现的次数',
          '3. 计算每个点数的概率',
          '4. 可视化分布结果'
        ],
        code: `# TODO: 骰子点数分布实验
import random

def dice_experiment(trials=6000):
    counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    
    for _ in range(trials):
        # TODO: 生成1-6的随机数
        roll = 0
        counts[roll] += 1
    
    print(f"投掷骰子{trials}次结果分布:")
    for num in range(1, 7):
        prob = counts[num] / trials
        # TODO: 用星号可视化分布
        bar = ""
        print(f"点数{num}: {bar} {counts[num]}次 ({prob:.2%})")

if __name__ == '__main__':
    dice_experiment()`,
        answer: `import random

def dice_experiment(trials=6000):
    counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    
    for _ in range(trials):
        # 生成1-6的随机数
        roll = random.randint(1, 6)
        counts[roll] += 1
    
    print(f"投掷骰子{trials}次结果分布:")
    for num in range(1, 7):
        prob = counts[num] / trials
        # 用星号可视化分布
        bar = "*" * int(prob * 100)
        print(f"点数{num}: {bar} {counts[num]}次 ({prob:.2%})")

if __name__ == '__main__':
    dice_experiment()`,
        expected: '输出骰子点数分布的统计和可视化结果',
        commonErrors: [
          'randint()参数范围错误',
          '字典键不存在',
          '可视化比例设置不合理'
        ]
      }
    ]
  },
  {
    id: 7,
    title: '日历生成工具',
    icon: '📅',
    description: '学习生成日历，理解日期计算逻辑',
    tasks: [
      {
        id: 'task1',
        title: '任务1：判断闰年',
        objective: '学习实现闰年判断逻辑',
        hint: '闰年规则：能被4整除但不能被100整除，或能被400整除',
        steps: [
          '1. 获取年份输入',
          '2. 实现闰年判断逻辑',
          '3. 返回布尔值表示是否为闰年'
        ],
        code: `# TODO: 判断闰年

def is_leap_year(year):
    # TODO: 实现闰年判断逻辑
    # 规则：能被4整除但不能被100整除，或能被400整除
    return False

if __name__ == '__main__':
    test_years = [2020, 2021, 1900, 2000]
    for year in test_years:
        is_leap = is_leap_year(year)
        result = '是' if is_leap else '不是'
        print(f"{year}年{result}闰年")`,
        answer: `def is_leap_year(year):
    # 实现闰年判断逻辑
    # 规则：能被4整除但不能被100整除，或能被400整除
    if year % 4 == 0:
        if year % 100 == 0:
            if year % 400 == 0:
                return True
            else:
                return False
        else:
            return True
    else:
        return False

if __name__ == '__main__':
    test_years = [2020, 2021, 1900, 2000]
    for year in test_years:
        is_leap = is_leap_year(year)
        result = '是' if is_leap else '不是'
        print(f"{year}年{result}闰年")`,
        expected: '正确判断给定年份是否为闰年',
        commonErrors: [
          '条件判断顺序错误',
          '忘记处理能被100整除的特殊情况',
          '返回值类型错误'
        ]
      },
      {
        id: 'task2',
        title: '任务2：生成月历',
        objective: '学习生成指定年月的日历',
        hint: '计算每月天数和第一天是星期几',
        steps: [
          '1. 定义每月天数（考虑闰年）',
          '2. 计算该月第一天是星期几',
          '3. 打印日历表头',
          '4. 填充日期并对齐'
        ],
        code: `# TODO: 生成月历

def generate_month_calendar(year, month):
    # 每月天数
    month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    # TODO: 判断闰年并调整2月天数
    if month == 2:
        pass
    
    # TODO: 计算第一天是星期几（0=星期一，6=星期日）
    first_day = 0
    
    print(f"\\n      {year}年{month}月")
    print("日 一 二 三 四 五 六")
    
    # TODO: 打印空格填充开头
    print("   " * first_day, end="")
    
    # TODO: 打印日期
    for day in range(1, month_days[month - 1] + 1):
        print(f"{day:2d} ", end="")
        # TODO: 每周换行
        if (day + first_day) % 7 == 0:
            print()
    print()

if __name__ == '__main__':
    generate_month_calendar(2024, 2)`,
        answer: `def is_leap_year(year):
    if year % 4 == 0:
        if year % 100 == 0:
            return year % 400 == 0
        return True
    return False

def generate_month_calendar(year, month):
    # 每月天数
    month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    # 判断闰年并调整2月天数
    if month == 2 and is_leap_year(year):
        month_days[1] = 29
    
    # 计算第一天是星期几（使用datetime模块）
    import datetime
    first_day = datetime.date(year, month, 1).weekday()  # 0=星期一
    
    print(f"\\n      {year}年{month}月")
    print("一 二 三 四 五 六 日")
    
    # 打印空格填充开头
    print("   " * first_day, end="")
    
    # 打印日期
    for day in range(1, month_days[month - 1] + 1):
        print(f"{day:2d} ", end="")
        # 每周换行
        if (day + first_day) % 7 == 0:
            print()
    print()

if __name__ == '__main__':
    generate_month_calendar(2024, 2)`,
        expected: '输出指定年月的日历',
        commonErrors: [
          '月份索引错误（从0开始还是从1开始）',
          '闰年判断错误',
          '星期计算错误'
        ]
      }
    ]
  },
  {
    id: 8,
    title: '字符串处理工具',
    icon: '🔤',
    description: '学习常用的字符串处理技巧',
    tasks: [
      {
        id: 'task1',
        title: '任务1：字符串统计',
        objective: '学习统计字符串中的字符、单词、行数',
        hint: '使用字符串内置方法',
        steps: [
          '1. 统计字符数（含空格和不含空格）',
          '2. 统计单词数',
          '3. 统计行数',
          '4. 统计标点符号数'
        ],
        code: `# TODO: 字符串统计工具

def string_stats(text):
    # TODO: 统计字符数（含空格）
    total_chars = 0
    
    # TODO: 统计字符数（不含空格）
    chars_no_space = 0
    
    # TODO: 统计单词数
    words = 0
    
    # TODO: 统计行数
    lines = 0
    
    # TODO: 统计标点符号数
    punctuation = 0
    
    print(f"字符数（含空格）: {total_chars}")
    print(f"字符数（不含空格）: {chars_no_space}")
    print(f"单词数: {words}")
    print(f"行数: {lines}")
    print(f"标点符号数: {punctuation}")

if __name__ == '__main__':
    text = "Hello World!\\nThis is a test.\\n你好，世界！"
    string_stats(text)`,
        answer: `def string_stats(text):
    # 统计字符数（含空格）
    total_chars = len(text)
    
    # 统计字符数（不含空格）
    chars_no_space = len(text.replace(" ", "").replace("\\n", "").replace("\\t", ""))
    
    # 统计单词数（按空格分割）
    words = len(text.split())
    
    # 统计行数
    lines = text.count("\\n") + 1
    
    # 统计标点符号数
    punctuation_chars = ".,!?;:\\\"'()[]{}<>"
    punctuation = sum(1 for char in text if char in punctuation_chars)
    
    print(f"字符数（含空格）: {total_chars}")
    print(f"字符数（不含空格）: {chars_no_space}")
    print(f"单词数: {words}")
    print(f"行数: {lines}")
    print(f"标点符号数: {punctuation}")

if __name__ == '__main__':
    text = "Hello World!\\nThis is a test.\\n你好，世界！"
    string_stats(text)`,
        expected: '输出字符串的各项统计数据',
        commonErrors: [
          '忘记处理换行符',
          'split()默认按任意空白字符分割',
          '标点符号集不完整'
        ]
      },
      {
        id: 'task2',
        title: '任务2：文本加密解密',
        objective: '学习简单的文本加密解密算法',
        hint: '使用凯撒密码或替换密码',
        steps: [
          '1. 定义字母表',
          '2. 实现加密函数（字母移位）',
          '3. 实现解密函数',
          '4. 处理大小写和非字母字符'
        ],
        code: `# TODO: 凯撒密码加密解密

def caesar_cipher(text, shift, encrypt=True):
    result = ""
    # TODO: 定义字母表
    uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    lowercase = "abcdefghijklmnopqrstuvwxyz"
    
    if not encrypt:
        shift = -shift
    
    for char in text:
        # TODO: 处理大写字母
        if char in uppercase:
            pass
        # TODO: 处理小写字母
        elif char in lowercase:
            pass
        # TODO: 其他字符保持不变
        else:
            result += char
    
    return result

if __name__ == '__main__':
    original = "Hello World!"
    encrypted = caesar_cipher(original, 3)
    decrypted = caesar_cipher(encrypted, 3, encrypt=False)
    print(f"原文: {original}")
    print(f"加密后: {encrypted}")
    print(f"解密后: {decrypted}")`,
        answer: `def caesar_cipher(text, shift, encrypt=True):
    result = ""
    # 定义字母表
    uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    lowercase = "abcdefghijklmnopqrstuvwxyz"
    
    if not encrypt:
        shift = -shift
    
    for char in text:
        # 处理大写字母
        if char in uppercase:
            index = (uppercase.index(char) + shift) % 26
            result += uppercase[index]
        # 处理小写字母
        elif char in lowercase:
            index = (lowercase.index(char) + shift) % 26
            result += lowercase[index]
        # 其他字符保持不变
        else:
            result += char
    
    return result

if __name__ == '__main__':
    original = "Hello World!"
    encrypted = caesar_cipher(original, 3)
    decrypted = caesar_cipher(encrypted, 3, encrypt=False)
    print(f"原文: {original}")
    print(f"加密后: {encrypted}")
    print(f"解密后: {decrypted}")`,
        expected: '正确加密和解密文本',
        commonErrors: [
          '忘记处理大小写',
          '没有使用模运算导致索引越界',
          '解密时忘记取反位移'
        ]
      }
    ]
  },
  {
    id: 9,
    title: '数据纠错校验',
    icon: '✅',
    description: '学习数据校验和纠错的基本方法',
    tasks: [
      {
        id: 'task1',
        title: '任务1：身份证号校验',
        objective: '学习校验身份证号格式',
        hint: '检查长度、位数、校验码',
        steps: [
          '1. 检查长度是否为18位',
          '2. 检查前17位是否为数字',
          '3. 检查最后一位是否为数字或X',
          '4. 验证校验码'
        ],
        code: `# TODO: 身份证号校验

def validate_id_card(id_card):
    # TODO: 检查长度
    if len(id_card) != 18:
        return False, "长度必须为18位"
    
    # TODO: 检查前17位是否为数字
    if not id_card[:17].isdigit():
        return False, "前17位必须为数字"
    
    # TODO: 检查最后一位
    last_char = id_card[-1]
    if not (last_char.isdigit() or last_char.upper() == "X"):
        return False, "最后一位必须为数字或X"
    
    # TODO: 验证校验码（简化版）
    return True, "校验通过"

if __name__ == '__main__':
    test_cards = ["110101199003077758", "123456", "abc123456789012345"]
    for card in test_cards:
        valid, msg = validate_id_card(card)
        result = '有效' if valid else '无效'
        print(f"{card}: {result} - {msg}")`,
        answer: `def validate_id_card(id_card):
    # 检查长度
    if len(id_card) != 18:
        return False, "长度必须为18位"
    
    # 检查前17位是否为数字
    if not id_card[:17].isdigit():
        return False, "前17位必须为数字"
    
    # 检查最后一位
    last_char = id_card[-1]
    if not (last_char.isdigit() or last_char.upper() == "X"):
        return False, "最后一位必须为数字或X"
    
    # 验证校验码
    weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    check_codes = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]
    
    total = sum(int(id_card[i]) * weights[i] for i in range(17))
    expected_check = check_codes[total % 11]
    
    if id_card[-1].upper() != expected_check:
        return False, "校验码错误"
    
    return True, "校验通过"

if __name__ == '__main__':
    test_cards = ["110101199003077758", "123456", "abc123456789012345"]
    for card in test_cards:
        valid, msg = validate_id_card(card)
        result = '有效' if valid else '无效'
        print(f"{card}: {result} - {msg}")`,
        expected: '正确校验身份证号格式',
        commonErrors: [
          '忘记检查长度',
          '校验码算法错误',
          '没有处理大小写X'
        ]
      },
      {
        id: 'task2',
        title: '任务2：邮箱格式校验',
        objective: '学习使用正则表达式校验邮箱',
        hint: '使用re模块进行正则匹配',
        steps: [
          '1. 导入re模块',
          '2. 定义邮箱正则表达式',
          '3. 使用match()方法进行匹配',
          '4. 返回校验结果'
        ],
        code: `# TODO: 邮箱格式校验
import re

def validate_email(email):
    # TODO: 定义邮箱正则表达式
    pattern = ""
    
    # TODO: 使用match()匹配
    if re.match(pattern, email):
        return True, "格式正确"
    else:
        return False, "格式错误"

if __name__ == '__main__':
    test_emails = ["test@example.com", "invalid-email", "user.name@domain.org"]
    for email in test_emails:
        valid, msg = validate_email(email)
        result = '有效' if valid else '无效'
        print(f"{email}: {result} - {msg}")`,
        answer: `import re

def validate_email(email):
    # 定义邮箱正则表达式
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    
    # 使用match()匹配
    if re.match(pattern, email):
        return True, "格式正确"
    else:
        return False, "格式错误"

if __name__ == '__main__':
    test_emails = ["test@example.com", "invalid-email", "user.name@domain.org"]
    for email in test_emails:
        valid, msg = validate_email(email)
        result = '有效' if valid else '无效'
        print(f"{email}: {result} - {msg}")`,
        expected: '正确校验邮箱格式',
        commonErrors: [
          '正则表达式语法错误',
          '忘记导入re模块',
          '正则表达式不够严谨'
        ]
      }
    ]
  },
  {
    id: 10,
    title: '数组数据拼接',
    icon: '🔗',
    description: '学习数组和列表的拼接与合并操作',
    tasks: [
      {
        id: 'task1',
        title: '任务1：列表合并去重',
        objective: '学习合并多个列表并去除重复元素',
        hint: '使用set进行去重',
        steps: [
          '1. 定义多个列表',
          '2. 使用+运算符或extend()合并',
          '3. 转换为set去重',
          '4. 转换回列表'
        ],
        code: `# TODO: 列表合并去重

def merge_and_deduplicate(*lists):
    # TODO: 合并所有列表
    merged = []
    for lst in lists:
        pass
    
    # TODO: 去重
    unique = []
    
    return unique

if __name__ == '__main__':
    list1 = [1, 2, 3, 4]
    list2 = [3, 4, 5, 6]
    list3 = [5, 6, 7, 8]
    
    result = merge_and_deduplicate(list1, list2, list3)
    print(f"合并去重后: {result}")`,
        answer: `def merge_and_deduplicate(*lists):
    # 合并所有列表
    merged = []
    for lst in lists:
        merged.extend(lst)
    
    # 去重
    unique = list(set(merged))
    
    return unique

if __name__ == '__main__':
    list1 = [1, 2, 3, 4]
    list2 = [3, 4, 5, 6]
    list3 = [5, 6, 7, 8]
    
    result = merge_and_deduplicate(list1, list2, list3)
    print(f"合并去重后: {result}")`,
        expected: '输出合并去重后的列表',
        commonErrors: [
          '忘记使用extend()而是用了+',
          '转换为set后顺序丢失',
          '参数处理错误'
        ]
      },
      {
        id: 'task2',
        title: '任务2：矩阵拼接',
        objective: '学习二维列表（矩阵）的拼接操作',
        hint: '使用嵌套循环或列表推导式',
        steps: [
          '1. 定义两个矩阵',
          '2. 实现按行拼接',
          '3. 实现按列拼接',
          '4. 处理行数/列数不匹配的情况'
        ],
        code: `# TODO: 矩阵拼接

def concat_matrix_rows(matrix1, matrix2):
    # TODO: 按行拼接
    return matrix1 + matrix2

def concat_matrix_cols(matrix1, matrix2):
    # TODO: 按列拼接
    result = []
    # 检查行数是否相同
    if len(matrix1) != len(matrix2):
        return None, "行数不匹配"
    
    for i in range(len(matrix1)):
        # TODO: 合并对应行
        row = []
        result.append(row)
    
    return result, "成功"

if __name__ == '__main__':
    m1 = [[1, 2], [3, 4]]
    m2 = [[5, 6], [7, 8]]
    
    row_concat = concat_matrix_rows(m1, m2)
    print(f"按行拼接:\\n{row_concat}")
    
    col_concat, msg = concat_matrix_cols(m1, m2)
    print(f"按列拼接:\\n{col_concat}")`,
        answer: `def concat_matrix_rows(matrix1, matrix2):
    # 按行拼接
    return matrix1 + matrix2

def concat_matrix_cols(matrix1, matrix2):
    # 按列拼接
    result = []
    # 检查行数是否相同
    if len(matrix1) != len(matrix2):
        return None, "行数不匹配"
    
    for i in range(len(matrix1)):
        # 合并对应行
        row = matrix1[i] + matrix2[i]
        result.append(row)
    
    return result, "成功"

if __name__ == '__main__':
    m1 = [[1, 2], [3, 4]]
    m2 = [[5, 6], [7, 8]]
    
    row_concat = concat_matrix_rows(m1, m2)
    print(f"按行拼接:\\n{row_concat}")
    
    col_concat, msg = concat_matrix_cols(m1, m2)
    print(f"按列拼接:\\n{col_concat}")`,
        expected: '正确进行矩阵的按行和按列拼接',
        commonErrors: [
          '行数不匹配时没有错误处理',
          '列拼接时忘记遍历每行',
          '列表索引错误'
        ]
      }
    ]
  }
]
