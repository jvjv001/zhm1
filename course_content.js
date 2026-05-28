const courseContentData = {
    'topic1': {
        title: 'Pandas入门：Series与DataFrame',
        objectives: ['掌握Series的创建和基本操作', '掌握DataFrame的创建和基本操作', '理解索引和标签访问', '理解Series与NumPy的区别', '能独立完成基础数据探索'],
        content: `
<div class="content-header">
    <h1 class="content-title">Pandas入门：Series与DataFrame</h1>
    <p class="content-subtitle">掌握Pandas的核心数据结构</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>掌握Series的创建和基本操作</li>
            <li>掌握DataFrame的创建和基本操作</li>
            <li>理解索引和标签访问</li>
            <li>理解Series与NumPy的区别</li>
            <li>能独立完成基础数据探索</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某电商公司的运营团队需要分析近期的产品销售数据。他们的数据存储在Excel中，包含产品名称、销量、单价、销售额等信息。由于数据量不断增长，Excel处理变得越来越慢且容易出错。作为数据分析师，你需要使用Pandas来处理这些数据，快速分析销售表现，识别热门产品，为业务决策提供数据支持。在这个场景中，我们可以用Series记录每个产品的销量，用DataFrame存储完整的订单表格，包括产品名称、销量、价格、客户信息等多维数据。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>什么是Series?</h4>
        <p>Series是Pandas的一维数据结构，可以看作是带有标签的数组或增强版的Python列表。每个元素都有对应的索引（index）和值（value）。索引可以是整数、浮点数、字符串等类型，默认是从0开始的整数索引。Series与NumPy数组的主要区别在于Series具有索引标签，可以通过标签而不仅仅是位置来访问数据，这使得数据操作更加直观和灵活。</p>
        
        <h4>什么是DataFrame?</h4>
        <p>DataFrame是Pandas的二维数据结构，类似Excel表格或关系型数据库中的表。它由行索引（index）和列名（columns）构成，每一列都是一个Series，可以存储不同类型的数据（字符串、数字、日期等）。DataFrame是处理结构化数据分析最常用的数据结构，支持数据清洗、筛选、排序、分组、聚合等各种操作，是Python数据分析的核心工具。</p>
        
        <h4>Series与DataFrame的关系</h4>
        <p>DataFrame的每一列都是一个Series，DataFrame可以看作是多个Series共享同一个索引组合而成的。比如在销售数据表中，产品名称、销量、价格等每个列都是Series，它们共享相同的行索引，组合在一起就构成了一个完整的DataFrame。理解这种关系对于掌握Pandas的数据操作非常重要。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：创建Series</h4>
        <div class="code-example">
            <pre>import pandas as pd
import numpy as np

# 创建默认索引的Series
s1 = pd.Series([15, 30, 45, 60])
print("=== 默认索引Series ===")
print(s1)
print("索引:", s1.index.tolist())
print("值:", s1.values.tolist())

# 创建自定义索引的Series
s2 = pd.Series([85, 90, 88, 92], 
               index=['张三', '李四', '王五', '赵六'], 
               name='数学成绩')
print("\n=== 自定义索引Series ===")
print(s2)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 默认索引Series ===
0    15
1    30
2    45
3    60
dtype: int64
索引: [0, 1, 2, 3]
值: [15, 30, 45, 60]

=== 自定义索引Series ===
张三    85
李四    90
王五    88
赵六    92
Name: 数学成绩, dtype: int64</pre>
        </div>
        
        <h4>示例2：创建DataFrame</h4>
        <div class="code-example">
            <pre># 从字典创建DataFrame
data = {
    '产品名称': ['苹果', '香蕉', '橙子', '葡萄', '西瓜'],
    '销量': [120, 250, 180, 90, 150],
    '单价': [5.5, 3.2, 4.8, 12.0, 2.5],
    '类别': ['水果', '水果', '水果', '水果', '水果']
}
df = pd.DataFrame(data)
print("=== 产品销售数据 ===")
print(df)
print("\n数据形状:", df.shape)
print("列名:", df.columns.tolist())</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 产品销售数据 ===
  产品名称  销量   单价 类别
0    苹果  120   5.5  水果
1    香蕉  250   3.2  水果
2    橙子  180   4.8  水果
3    葡萄   90  12.0  水果
4    西瓜  150   2.5  水果

数据形状: (5, 4)
列名: ['产品名称', '销量', '单价', '类别']</pre>
        </div>
        
        <h4>示例3：访问数据</h4>
        <div class="code-example">
            <pre># 访问列
print("=== 访问销量列 ===")
print(df['销量'])

# 计算销售额
df['销售额'] = df['销量'] * df['单价']
print("\n=== 添加销售额列 ===")
print(df[['产品名称', '销量', '单价', '销售额']])

# 条件筛选
print("\n=== 销量大于150的产品 ===")
print(df[df['销量'] > 150])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 访问销量列 ===
0    120
1    250
2    180
3     90
4    150
Name: 销量, dtype: int64

=== 添加销售额列 ===
  产品名称  销量   单价     销售额
0    苹果  120   5.5   660.0
1    香蕉  250   3.2   800.0
2    橙子  180   4.8   864.0
3    葡萄   90  12.0  1080.0
4    西瓜  150   2.5   375.0

=== 销量大于150的产品 ===
  产品名称  销量   单价 类别     销售额
1    香蕉  250   3.2  水果   800.0
2    橙子  180   4.8  水果   864.0</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 创建一个Series，包含数据为[100, 200, 300]，索引为['a','b','c']，正确的代码是？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. pd.Series([100,200,300], index=['a','b','c'])</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. pd.Series(['a','b','c'])</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. pd.DataFrame([100,200,300])</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. Series([100,200,300])</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：pd.Series(data, index=index_data)是创建Series的正确语法。选项B只创建了索引没有数据；选项C创建的是DataFrame而不是Series；选项D缺少pd.前缀。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 从DataFrame中访问名为'name'的列，以下哪种方式是正确的？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. df['name']</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. df.loc['name']</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. df.name)</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. df.loc[name]</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：df['列名']是访问DataFrame列的标准方式。选项B的loc用于按标签访问行；选项C有语法错误；选项D的name应该加引号且loc用于行访问。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. 关于DataFrame每一列的数据类型，以下说法正确的是？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">A. 必须一致</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">B. 可以不同</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. 只能是整数</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. 只能是字符串</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：B</p>
                <p>解析：DataFrame的每一列可以有不同的数据类型，这是DataFrame的重要特性之一。比如一列可以是字符串（产品名称），另一列可以是数字（销量），第三列可以是日期（销售日期）。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic2': {
        title: '数据读取与写入（CSV/Excel）',
        objectives: ['掌握读取CSV文件的方法', '掌握读取Excel文件的方法', '学会保存数据为CSV格式', '学会保存数据为Excel格式', '理解编码参数的使用'],
        content: `
<div class="content-header">
    <h1 class="content-title">数据读取与写入（CSV/Excel）</h1>
    <p class="content-subtitle">掌握数据读取与保存的核心技能</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>掌握读取CSV文件的方法</li>
            <li>掌握读取Excel文件的方法</li>
            <li>学会保存数据为CSV格式</li>
            <li>学会保存数据为Excel格式</li>
            <li>理解编码参数的使用</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某零售公司的销售部门每天都会生成销售报告，这些报告以CSV和Excel格式存储。作为数据分析师，你需要每天自动导入这些数据到Python中进行清洗和分析，然后将分析结果保存为Excel报告发送给管理层。掌握数据的读取和写入功能是进行数据分析的第一步，它让你能够从各种数据源获取数据，并将分析成果保存下来。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>读取CSV文件</h4>
        <p>read_csv()是Pandas用于读取CSV文件的核心函数。常用参数包括：filepath_or_buffer（文件路径）、sep（分隔符，默认逗号）、header（指定哪一行作为列名）、encoding（文件编码，常见utf-8、gbk）、usecols（指定读取哪些列）、nrows（读取前n行）。CSV文件是最常见的数据交换格式之一，几乎所有的数据工具都支持CSV格式。</p>
        
        <h4>读取Excel文件</h4>
        <p>read_excel()用于读取Excel文件，支持.xlsx和.xls格式。常用参数包括：sheet_name（指定工作表，可以是工作表名或索引）、engine（读取引擎，openpyxl用于.xlsx，xlrd用于.xls）、header、usecols等。需要注意的是，读取Excel文件通常需要安装额外的库如openpyxl或xlrd。</p>
        
        <h4>保存数据</h4>
        <p>to_csv()将DataFrame保存为CSV文件，to_excel()保存为Excel文件。常用参数包括：index（是否保存索引列，通常设为False）、encoding（编码格式）、sheet_name（Excel工作表名）。保存数据时要注意编码问题，特别是处理中文数据时，建议使用utf-8或utf-8-sig编码。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：读取CSV文件</h4>
        <div class="code-example">
            <pre>import pandas as pd

# 创建示例数据
data = {
    '订单号': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005'],
    '产品': ['手机', '电脑', '平板', '耳机', '充电器'],
    '数量': [2, 1, 3, 5, 10],
    '单价': [3999, 6999, 2999, 199, 69],
    '日期': ['2024-01-15', '2024-01-15', '2024-01-16', '2024-01-16', '2024-01-17']
}
df = pd.DataFrame(data)

print("=== 模拟CSV数据 ===")
print(df)

# 读取指定列
df_selected = df[['产品', '数量', '单价']]
print("\n=== 只读取产品和数量列 ===")
print(df_selected)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 模拟CSV数据 ===
    订单号  产品  数量    单价          日期
0  ORD001  手机   2  3999  2024-01-15
1  ORD002  电脑   1  6999  2024-01-15
2  ORD003  平板   3  2999  2024-01-16
3  ORD004  耳机   5   199  2024-01-16
4  ORD005  充电器  10    69  2024-01-17

=== 只读取产品和数量列 ===
   产品  数量    单价
0  手机   2  3999
1  电脑   1  6999
2  平板   3  2999
3  耳机   5   199
4  充电器  10    69</pre>
        </div>
        
        <h4>示例2：处理Excel文件</h4>
        <div class="code-example">
            <pre># 创建多工作表数据模拟Excel
sales_data = pd.DataFrame({
    '月份': ['1月', '1月', '2月', '2月', '3月'],
    '产品': ['A', 'B', 'A', 'B', 'A'],
    '销量': [100, 150, 120, 180, 200]
})

inventory_data = pd.DataFrame({
    '产品': ['A', 'B', 'C', 'D'],
    '库存': [500, 300, 200, 100],
    '库位': ['A1', 'A2', 'B1', 'B2']
})

print("=== 销售数据 ===")
print(sales_data)
print("\n=== 库存数据 ===")
print(inventory_data)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 销售数据 ===
  月份 产品  销量
0  1月  A  100
1  1月  B  150
2  2月  A  120
3  2月  B  180
4  3月  A  200

=== 库存数据 ===
  产品  库存 库位
0  A  500  A1
1  B  300  A2
2  C  200  B1
3  D  100  B2</pre>
        </div>
        
        <h4>示例3：保存数据</h4>
        <div class="code-example">
            <pre># 计算销售额
df['销售额'] = df['数量'] * df['单价']
print("=== 计算销售额后的数据 ===")
print(df[['订单号', '产品', '数量', '单价', '销售额']])

# 模拟保存操作
print("\n=== 保存数据 ===")
print("df.to_csv('result.csv', index=False, encoding='utf-8-sig')")
print("df.to_excel('result.xlsx', index=False, sheet_name='销售数据')")
print("\\n保存成功！")</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 计算销售额后的数据 ===
    订单号  产品  数量    单价    销售额
0  ORD001  手机   2  3999   7998
1  ORD002  电脑   1  6999   6999
2  ORD003  平板   3  2999   8997
3  ORD004  耳机   5   199    995
4  ORD005  充电器  10    69    690

=== 保存数据 ===
df.to_csv('result.csv', index=False, encoding='utf-8-sig')
df.to_excel('result.xlsx', index=False, sheet_name='销售数据')

保存成功！</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 读取CSV文件应该使用以下哪个函数？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. pd.read_csv()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. pd.read_excel()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. pd.read()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. load_csv()</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：pd.read_csv()是Pandas专门用于读取CSV文件的函数。read_excel用于读取Excel文件；选项C和D不是Pandas的标准函数。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 保存文件时设置index=False的目的是什么？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. 不保存索引列</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. 保存索引列</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. 提高保存速度</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. 压缩文件大小</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：index=False参数表示不将DataFrame的索引列保存到文件中。通常索引列对用户没有实际意义，所以保存时经常设置index=False。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. read_excel函数中用于指定工作表的参数是？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. sheet_name</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. sheet</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. worksheet</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. sheetname</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：sheet_name参数用于指定要读取的工作表，可以是工作表名称字符串或索引数字。选项D是旧版本Pandas的参数，现已不推荐使用。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic3': {
        title: '数据预览与筛选（head、iloc、loc）',
        objectives: ['掌握数据预览的方法', '理解loc和iloc的区别', '掌握条件筛选技术', '学会使用isin()方法', '理解索引和标签的使用'],
        content: `
<div class="content-header">
    <h1 class="content-title">数据预览与筛选（head、iloc、loc）</h1>
    <p class="content-subtitle">掌握数据探索和精确访问的技巧</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>掌握数据预览的方法</li>
            <li>理解loc和iloc的区别</li>
            <li>掌握条件筛选技术</li>
            <li>学会使用isin()方法</li>
            <li>理解索引和标签的使用</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某电商平台的数据分析团队需要分析月度销售报告。这份报告包含了数万条销售记录，数据量很大。分析师需要先快速预览数据，了解数据结构；然后查看特定时间段或特定产品类别的数据；接着筛选出销量大于100的产品；最后分析来自北京、上海、广州这几个高销量城市的数据。掌握数据预览和筛选技术可以帮助分析师快速定位感兴趣的数据，提高分析效率。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>数据预览</h4>
        <p>head(n)显示前n行数据（默认n=5），tail(n)显示后n行数据，这两个函数用于快速查看数据结构。info()显示数据的基本信息，包括列名、非空值数量、数据类型等。describe()显示数值列的统计信息，包括计数、均值、标准差、最小值、25%/50%/75%分位数、最大值等，帮助快速了解数据分布。</p>
        
        <h4>loc与iloc</h4>
        <p>loc是基于标签的索引器，用于按行标签和列名访问数据。iloc是基于整数位置的索引器，用于按行号和列号访问数据。loc的切片是包含末端的（如loc[0:5]包含索引5），而iloc的切片是不包含末端的（如iloc[0:5]不包含位置5）。这两个是Pandas中最常用的数据访问方式。</p>
        
        <h4>条件筛选</h4>
        <p>布尔索引是Pandas中强大的筛选功能，可以通过条件表达式筛选数据。多个条件可以用&（与）、|（或）、~（非）组合，每个条件需要用括号括起来。isin()方法用于筛选列值在指定列表中的行，非常适合处理多选条件。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：数据预览</h4>
        <div class="code-example">
            <pre>import pandas as pd

# 创建示例数据
data = pd.DataFrame({
    '产品名称': ['手机', '电脑', '平板', '耳机', '充电器', '键盘', '鼠标', '显示器'],
    '类别': ['数码', '数码', '数码', '配件', '配件', '配件', '配件', '数码'],
    '销量': [120, 80, 60, 200, 350, 150, 180, 45],
    '单价': [3999, 6999, 2999, 199, 69, 129, 99, 1599],
    '城市': ['北京', '上海', '广州', '深圳', '北京', '上海', '广州', '深圳']
})

print("=== 前3行数据 ===")
print(data.head(3))

print("\n=== 数据基本信息 ===")
print("形状:", data.shape)
print("列名:", data.columns.tolist())

print("\n=== 数值统计信息 ===")
print(data[['销量', '单价']].describe())</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 前3行数据 ===
  产品名称  类别  销量    单价  城市
0    手机  数码  120  3999  北京
1    电脑  数码   80  6999  上海
2    平板  数码   60  2999  广州

=== 数据基本信息 ===
形状: (8, 5)
列名: ['产品名称', '类别', '销量', '单价', '城市']

=== 数值统计信息 ===
            销量           单价
count    8.000000     8.000000
mean   148.125000  2011.500000
std     98.033262  2504.427973
min     45.000000    69.000000
25%     75.000000   116.500000
50%    135.000000   899.000000
75%    185.000000  3249.000000
max    350.000000  6999.000000</pre>
        </div>
        
        <h4>示例2：loc和iloc的使用</h4>
        <div class="code-example">
            <pre># iloc按位置访问
print("=== iloc按位置访问 - 前2行 ===")
print(data.iloc[0:2])

print("\n=== iloc按位置访问 - 第0行和第2行，第0列和第2列 ===")
print(data.iloc[[0, 2], [0, 2]])

# loc按标签访问
print("\n=== loc按标签访问 - 产品名称和销量 ===")
print(data.loc[:, ['产品名称', '销量']])

print("\n=== loc条件筛选 - 销量大于100 ===")
print(data.loc[data['销量'] > 100, ['产品名称', '销量', '城市']])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== iloc按位置访问 - 前2行 ===
  产品名称  类别  销量    单价  城市
0    手机  数码  120  3999  北京
1    电脑  数码   80  6999  上海

=== iloc按位置访问 - 第0行和第2行，第0列和第2列 ===
  产品名称  销量
0    手机  120
2    平板   60

=== loc按标签访问 - 产品名称和销量 ===
  产品名称  销量
0    手机  120
1    电脑   80
2    平板   60
3    耳机  200
4   充电器  350
5    键盘  150
6    鼠标  180
7   显示器   45

=== loc条件筛选 - 销量大于100 ===
  产品名称  销量  城市
0    手机  120  北京
3    耳机  200  深圳
4   充电器  350  北京
5    键盘  150  上海
6    鼠标  180  广州</pre>
        </div>
        
        <h4>示例3：条件筛选和isin()</h4>
        <div class="code-example">
            <pre># 多条件筛选
print("=== 类别为数码且销量大于70 ===")
condition1 = (data['类别'] == '数码')
condition2 = (data['销量'] > 70)
print(data[condition1 & condition2])

# isin()筛选
print("\n=== 城市在北京、上海、广州 ===")
target_cities = ['北京', '上海', '广州']
print(data[data['城市'].isin(target_cities)])

# 组合条件
print("\n=== 销量在100-200之间且类别为配件 ===")
condition3 = (data['销量'] >= 100) & (data['销量'] <= 200)
condition4 = (data['类别'] == '配件')
print(data[condition3 & condition4])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 类别为数码且销量大于70 ===
  产品名称  类别  销量    单价  城市
0    手机  数码  120  3999  北京
1    电脑  数码   80  6999  上海

=== 城市在北京、上海、广州 ===
  产品名称  类别  销量    单价  城市
0    手机  数码  120  3999  北京
1    电脑  数码   80  6999  上海
2    平板  数码   60  2999  广州
4   充电器  配件  350    69  北京
5    键盘  配件  150   129  上海
6    鼠标  配件  180    99  广州

=== 销量在100-200之间且类别为配件 ===
  产品名称  类别  销量   单价  城市
3    耳机  配件  200  199  深圳
5    键盘  配件  150  129  上海
6    鼠标  配件  180   99  广州</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 查看数据前3行应该使用以下哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. df.head(3)</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. df.tail(3)</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. df.top(3)</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. df.first(3)</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：df.head(n)用于显示数据的前n行，默认n=5。tail(n)显示后n行；选项C和D不是Pandas的标准方法。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 按整数位置索引访问数据应该使用哪个？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. iloc</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. loc</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. loc和iloc都可以</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. 都不可以</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：iloc是基于整数位置的索引器，用于按行号和列号访问数据。loc是基于标签的索引器。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. 筛选某列的值在指定列表中的数据应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. isin()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. in()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. include()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. contains()</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：isin()方法用于判断列值是否在指定列表中。contains()用于字符串包含判断；选项B和C不是Pandas的标准方法。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic4': {
        title: '数据排序与排名',
        objectives: ['掌握使用sort_values排序', '掌握使用rank进行排名', '理解升序和降序的设置', '掌握多列排序', '理解排名并列的处理方式'],
        content: `
<div class="content-header">
    <h1 class="content-title">数据排序与排名</h1>
    <p class="content-subtitle">掌握排序和排名的核心技能</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>掌握使用sort_values排序</li>
            <li>掌握使用rank进行排名</li>
            <li>理解升序和降序的设置</li>
            <li>掌握多列排序</li>
            <li>理解排名并列的处理方式</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某公司的销售部门需要了解各产品的销售情况，制作销售排行榜。他们需要将产品按销量降序排列，找出销量排名前5的产品；同时还要按销售额进行排名，比较不同产品的贡献；对于销量相同的产品，需要合理处理它们的排名。这些排序和排名结果将被制作成报告，提交给管理层，为产品策略和库存管理提供决策依据。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>数据排序</h4>
        <p>sort_values()是Pandas中用于排序的主要函数。by参数指定排序的列名，可以是单列或多列列表。ascending参数控制排序方向，True为升序（默认），False为降序。当对多列排序时，ascending也可以传入一个布尔列表，分别对应每列的排序方向。排序后可以使用head()快速获取前N名数据。</p>
        
        <h4>数据排名</h4>
        <p>rank()函数用于计算数据的排名。ascending参数为False时，数值越大排名越靠前（如销量排名）。method参数控制并列排名的处理方式：'average'（默认，取平均排名）、'min'（取最小排名）、'max'（取最大排名）、'first'（按出现顺序排名）、'dense'（密集排名，排名连续不跳跃）。</p>
        
        <h4>多列排序</h4>
        <p>多列排序时，先按第一列排序，第一列相同的情况下按第二列排序，依此类推。例如先按类别升序，同类别的再按销量降序。这在实际业务中非常有用，比如先按地区分组，每个地区内按销售额排名。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：基本排序</h4>
        <div class="code-example">
            <pre>import pandas as pd

# 创建示例数据
data = pd.DataFrame({
    '产品名称': ['手机', '电脑', '平板', '耳机', '充电器', '键盘', '鼠标'],
    '类别': ['数码', '数码', '数码', '配件', '配件', '配件', '配件'],
    '销量': [200, 150, 150, 300, 500, 250, 200],
    '单价': [3999, 6999, 2999, 199, 69, 129, 99]
})
data['销售额'] = data['销量'] * data['单价']

print("=== 原始数据 ===")
print(data[['产品名称', '类别', '销量', '销售额']])

# 按销量降序排序
print("\n=== 按销量降序排序 ===")
df_sorted = data.sort_values('销量', ascending=False)
print(df_sorted[['产品名称', '销量', '销售额']])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 原始数据 ===
  产品名称  类别  销量     销售额
0    手机  数码  200   799800
1    电脑  数码  150  1049850
2    平板  数码  150   449850
3    耳机  配件  300    59700
4   充电器  配件  500    34500
5    键盘  配件  250    32250
6    鼠标  配件  200    19800

=== 按销量降序排序 ===
  产品名称  销量     销售额
4   充电器  500    34500
3    耳机  300    59700
5    键盘  250    32250
0    手机  200   799800
6    鼠标  200    19800
1    电脑  150  1049850
2    平板  150   449850</pre>
        </div>
        
        <h4>示例2：排名功能</h4>
        <div class="code-example">
            <pre># 计算销量排名（默认平均排名）
data['销量排名'] = data['销量'].rank(ascending=False, method='average')
# 计算销售额排名（最小排名）
data['销售额排名'] = data['销售额'].rank(ascending=False, method='min')

print("=== 销量和销售额排名 ===")
result = data[['产品名称', '销量', '销量排名', '销售额', '销售额排名']].copy()
result = result.sort_values('销量排名')
print(result)

# 不同排名方法对比
print("\n=== 不同排名方法对比 ===")
test_data = pd.Series([200, 150, 150, 200])
print("数据:", test_data.tolist())
print("average排名:", test_data.rank(ascending=False, method='average').tolist())
print("min排名:", test_data.rank(ascending=False, method='min').tolist())
print("dense排名:", test_data.rank(ascending=False, method='dense').tolist())</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 销量和销售额排名 ===
  产品名称  销量  销量排名     销售额  销售额排名
4   充电器  500      1.0    34500       6.0
3    耳机  300      2.0    59700       5.0
5    键盘  250      3.0    32250       7.0
0    手机  200      4.5   799800       2.0
6    鼠标  200      4.5    19800       8.0
1    电脑  150      6.5  1049850       1.0
2    平板  150      6.5   449850       4.0

=== 不同排名方法对比 ===
数据: [200, 150, 150, 200]
average排名: [1.5, 3.5, 3.5, 1.5]
min排名: [1.0, 3.0, 3.0, 1.0]
dense排名: [1.0, 2.0, 2.0, 1.0]</pre>
        </div>
        
        <h4>示例3：多列排序</h4>
        <div class="code-example">
            <pre># 先按类别升序，再按销量降序
print("=== 按类别升序，销量降序排序 ===")
df_multi = data.sort_values(
    by=['类别', '销量'], 
    ascending=[True, False]
)
print(df_multi[['产品名称', '类别', '销量', '销售额']])

# 获取销量前3名
print("\n=== 销量前3名 ===")
top3 = data.nlargest(3, '销量')
print(top3[['产品名称', '销量', '销售额']])

# 获取销售额前3名
print("\n=== 销售额前3名 ===")
top3_sales = data.nlargest(3, '销售额')
print(top3_sales[['产品名称', '销售额', '销量']])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 按类别升序，销量降序排序 ===
  产品名称  类别  销量     销售额
0    手机  数码  200   799800
1    电脑  数码  150  1049850
2    平板  数码  150   449850
4   充电器  配件  500    34500
3    耳机  配件  300    59700
5    键盘  配件  250    32250
6    鼠标  配件  200    19800

=== 销量前3名 ===
  产品名称  销量   销售额
4   充电器  500  34500
3    耳机  300  59700
5    键盘  250  32250

=== 销售额前3名 ===
  产品名称     销售额  销量
1    电脑  1049850  150
0    手机   799800  200
2    平板   449850  150</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 要按降序排序，sort_values函数的ascending参数应该设置为？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. ascending=False</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. ascending=True</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. reverse=True</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. descending=True</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：ascending=False表示降序排序，ascending=True表示升序排序（默认值）。reverse是Python列表排序的参数，不是Pandas的参数。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 用于计算数据排名的函数是？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. rank()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. sort()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. order()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. rank_values()</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：rank()是Pandas中专门用于计算排名的函数。sort_values用于排序，不是排名；选项C和D不是标准的Pandas函数。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. 获取销量最高的前5个产品，应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. df.nlargest(5, '销量')</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. df.sort_values('销量').head(5)</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. df.top(5)</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. df.max(5)</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：nlargest(n, column)是获取指定列最大的n个值的高效方法。选项B需要先排序再取前5，效率较低；选项C和D不是Pandas的标准方法。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic5': {
        title: '处理缺失值（dropna、fillna）',
        objectives: ['理解缺失值的概念', '掌握dropna方法删除缺失值', '掌握fillna方法填充缺失值', '理解不同填充策略的适用场景', '能独立处理真实数据中的缺失值'],
        content: `
<div class="content-header">
    <h1 class="content-title">处理缺失值（dropna、fillna）</h1>
    <p class="content-subtitle">掌握缺失值处理的核心方法</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>理解缺失值的概念</li>
            <li>掌握dropna方法删除缺失值</li>
            <li>掌握fillna方法填充缺失值</li>
            <li>理解不同填充策略的适用场景</li>
            <li>能独立处理真实数据中的缺失值</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某电商公司的订单数据中存在大量缺失值。由于系统bug和人工录入错误，客户ID、产品类别、订单金额等字段都存在缺失情况。作为数据分析师，你需要先检测缺失值的分布情况，然后根据业务规则进行处理：客户ID缺失的记录需要标记为"未知客户"，产品类别缺失的记录需要标记为"其他"，订单金额缺失的记录需要删除。处理完缺失值后，才能进行后续的销售分析。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>什么是缺失值？</h4>
        <p>缺失值是指数据集中某些位置没有值的情况，在Pandas中用NaN（Not a Number）表示。缺失值可能由多种原因产生：数据采集时的遗漏、系统错误、用户未填写等。处理缺失值是数据清洗的重要环节，不处理缺失值可能导致分析结果不准确。</p>
        
        <h4>dropna()方法</h4>
        <p>dropna()用于删除包含缺失值的行或列。常用参数包括：axis（0删除行，1删除列）、how（'any'只要有缺失值就删除，'all'全部缺失才删除）、subset（指定检查哪些列）、thresh（至少需要多少非缺失值）。删除缺失值会丢失数据，因此需要谨慎使用。</p>
        
        <h4>fillna()方法</h4>
        <p>fillna()用于填充缺失值。常用参数包括：value（填充的固定值）、method（'ffill'向前填充，'bfill'向后填充）、limit（限制填充数量）。填充策略需要根据业务场景选择，数值型数据常用均值、中位数填充，类别型数据常用众数或特定标记填充。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：检测缺失值</h4>
        <div class="code-example">
            <pre>import pandas as pd
import numpy as np

# 创建包含缺失值的数据
data = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005', 'ORD006'],
    '客户ID': ['C001', 'C002', None, 'C004', 'C005', 'C006'],
    '产品类别': ['电子产品', '办公用品', '电子产品', None, '办公用品', '电子产品'],
    '订单金额': [15800, 3200, 22500, np.nan, 8500, 19800],
    '订单状态': ['已完成', '处理中', '已完成', '已发货', None, '已完成']
})

print("=== 原始数据 ===")
print(data)

# 检测缺失值
print("\n=== 缺失值统计 ===")
print(data.isnull().sum())

# 查看有缺失值的行
print("\n=== 包含缺失值的行 ===")
print(data[data.isnull().any(axis=1)])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 原始数据 ===
    订单号 客户ID 产品类别    订单金额 订单状态
0  ORD001  C001   电子产品  15800.0    已完成
1  ORD002  C002   办公用品   3200.0   处理中
2  ORD003  None   电子产品  22500.0    已完成
3  ORD004  C004    None      NaN   已发货
4  ORD005  C005   办公用品   8500.0    None
5  ORD006  C006   电子产品  19800.0    已完成

=== 缺失值统计 ===
订单号      0
客户ID      1
产品类别     1
订单金额     1
订单状态     1
dtype: int64

=== 包含缺失值的行 ===
    订单号 客户ID 产品类别    订单金额 订单状态
2  ORD003  None   电子产品  22500.0    已完成
3  ORD004  C004    None      NaN   已发货
4  ORD005  C005   办公用品   8500.0    None</pre>
        </div>
        
        <h4>示例2：删除缺失值</h4>
        <div class="code-example">
            <pre># 删除任何包含缺失值的行
df_drop_any = data.dropna()
print("=== 删除所有含缺失值的行 ===")
print(df_drop_any)

# 只删除订单金额缺失的行
df_drop_subset = data.dropna(subset=['订单金额'])
print("\n=== 只删除订单金额缺失的行 ===")
print(df_drop_subset)

# 至少有4个非缺失值的行才保留
df_drop_thresh = data.dropna(thresh=4)
print("\n=== 至少4个非缺失值的行 ===")
print(df_drop_thresh)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 删除所有含缺失值的行 ===
    订单号 客户ID 产品类别    订单金额 订单状态
0  ORD001  C001   电子产品  15800.0    已完成
1  ORD002  C002   办公用品   3200.0   处理中
5  ORD006  C006   电子产品  19800.0    已完成

=== 只删除订单金额缺失的行 ===
    订单号 客户ID 产品类别    订单金额 订单状态
0  ORD001  C001   电子产品  15800.0    已完成
1  ORD002  C002   办公用品   3200.0   处理中
2  ORD003  None   电子产品  22500.0    已完成
4  ORD005  C005   办公用品   8500.0    None
5  ORD006  C006   电子产品  19800.0    已完成

=== 至少4个非缺失值的行 ===
    订单号 客户ID 产品类别    订单金额 订单状态
0  ORD001  C001   电子产品  15800.0    已完成
1  ORD002  C002   办公用品   3200.0   处理中
2  ORD003  None   电子产品  22500.0    已完成
4  ORD005  C005   办公用品   8500.0    None
5  ORD006  C006   电子产品  19800.0    已完成</pre>
        </div>
        
        <h4>示例3：填充缺失值</h4>
        <div class="code-example">
            <pre># 创建副本进行操作
df_filled = data.copy()

# 填充固定值
df_filled['客户ID'] = df_filled['客户ID'].fillna('未知客户')
df_filled['产品类别'] = df_filled['产品类别'].fillna('其他')

# 用均值填充订单金额
mean_amount = df_filled['订单金额'].mean()
df_filled['订单金额'] = df_filled['订单金额'].fillna(mean_amount)

# 用前一个值填充订单状态
df_filled['订单状态'] = df_filled['订单状态'].fillna(method='ffill')

print("=== 填充后的数据 ===")
print(df_filled)

print("\n=== 最终缺失值统计 ===")
print(df_filled.isnull().sum())</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 填充后的数据 ===
    订单号   客户ID 产品类别    订单金额 订单状态
0  ORD001    C001   电子产品  15800.0    已完成
1  ORD002    C002   办公用品   3200.0   处理中
2  ORD003  未知客户   电子产品  22500.0    已完成
3  ORD004    C004    其他    13960.0   已发货
4  ORD005    C005   办公用品   8500.0   已发货
5  ORD006    C006   电子产品  19800.0    已完成

=== 最终缺失值统计 ===
订单号      0
客户ID      0
产品类别     0
订单金额     0
订单状态     0
dtype: int64</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 检测DataFrame中缺失值的方法是？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. df.isnull()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. df.dropna()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. df.fillna()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. df.missing()</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：isnull()方法返回一个布尔DataFrame，标记哪些值是缺失值。dropna()用于删除缺失值，fillna()用于填充缺失值。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 向前填充缺失值应该使用哪个参数？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. method='ffill'</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. method='bfill'</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. method='forward'</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. method='prev'</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：ffill是forward fill的缩写，表示向前填充，即用前一个非缺失值填充当前缺失值。bfill是backward fill，表示向后填充。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. 只想删除'金额'列缺失的行，应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. df.dropna(subset=['金额'])</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. df.dropna(axis='金额')</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. df.drop(['金额'], axis=1)</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. df.dropna(columns='金额')</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：subset参数指定要检查的列，只有这些列中有缺失值时才删除该行。选项C是删除列而不是删除行。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic6': {
        title: '处理重复值（duplicated、drop_duplicates）',
        objectives: ['理解重复值的概念', '掌握duplicated方法检测重复值', '掌握drop_duplicates方法删除重复值', '理解keep参数的作用', '能独立处理真实数据中的重复值'],
        content: `
<div class="content-header">
    <h1 class="content-title">处理重复值（duplicated、drop_duplicates）</h1>
    <p class="content-subtitle">掌握重复值处理的核心方法</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>理解重复值的概念</li>
            <li>掌握duplicated方法检测重复值</li>
            <li>掌握drop_duplicates方法删除重复值</li>
            <li>理解keep参数的作用</li>
            <li>能独立处理真实数据中的重复值</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某电商平台的订单数据中存在大量重复记录。由于系统重复提交和网络延迟等原因，同一订单可能被多次记录到数据库中。作为数据分析师，你需要检测并删除这些重复订单，确保数据分析的准确性。重复订单会导致销量统计偏高、销售额计算错误等问题，因此处理重复值是数据清洗的重要步骤。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>什么是重复值？</h4>
        <p>重复值是指数据集中存在完全相同的行或在指定列上值相同的行。重复值可能由数据采集过程中的错误、系统bug、人工录入等原因产生。重复值会影响数据分析的准确性，导致统计结果偏高。</p>
        
        <h4>duplicated()方法</h4>
        <p>duplicated()用于检测重复值，返回一个布尔Series，标记哪些行是重复的。常用参数包括：subset（指定检查哪些列）、keep（'first'保留第一个出现的，'last'保留最后一个出现的，False标记所有重复行为True）。</p>
        
        <h4>drop_duplicates()方法</h4>
        <p>drop_duplicates()用于删除重复值。常用参数包括：subset（指定检查哪些列）、keep（'first'保留第一个，'last'保留最后一个，False删除所有重复行）、inplace（是否原地修改）。删除重复值时需要根据业务需求选择保留哪一条记录。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：检测重复值</h4>
        <div class="code-example">
            <pre>import pandas as pd

# 创建包含重复值的数据
data = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD003', 'ORD001', 'ORD004', 'ORD002', 'ORD005'],
    '客户ID': ['C001', 'C002', 'C003', 'C001', 'C004', 'C002', 'C005'],
    '金额': [15800, 3200, 22500, 15800, 8500, 3200, 19800],
    '日期': ['2024-01-15', '2024-01-15', '2024-01-16', '2024-01-15', '2024-01-16', '2024-01-15', '2024-01-17']
})

print("=== 原始数据 ===")
print(data)

# 检测重复行
print("\n=== 检测重复行 ===")
print(data.duplicated())

# 只检测订单号重复
print("\n=== 只检测订单号重复 ===")
print(data.duplicated(subset=['订单号']))

# 查看重复的行
print("\n=== 重复的行 ===")
print(data[data.duplicated()])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 原始数据 ===
    订单号 客户ID     金额          日期
0  ORD001  C001  15800  2024-01-15
1  ORD002  C002   3200  2024-01-15
2  ORD003  C003  22500  2024-01-16
3  ORD001  C001  15800  2024-01-15
4  ORD004  C004   8500  2024-01-16
5  ORD002  C002   3200  2024-01-15
6  ORD005  C005  19800  2024-01-17

=== 检测重复行 ===
0    False
1    False
2    False
3     True
4    False
5     True
6    False
dtype: bool

=== 只检测订单号重复 ===
0    False
1    False
2    False
3     True
4    False
5     True
6    False
dtype: bool

=== 重复的行 ===
    订单号 客户ID     金额          日期
3  ORD001  C001  15800  2024-01-15
5  ORD002  C002   3200  2024-01-15</pre>
        </div>
        
        <h4>示例2：删除重复值</h4>
        <div class="code-example">
            <pre># 保留第一个出现的重复值
df_first = data.drop_duplicates()
print("=== 保留第一个重复值 ===")
print(df_first)

# 保留最后一个出现的重复值
df_last = data.drop_duplicates(keep='last')
print("\n=== 保留最后一个重复值 ===")
print(df_last)

# 删除所有重复值（不保留任何重复行）
df_none = data.drop_duplicates(keep=False)
print("\n=== 删除所有重复行 ===")
print(df_none)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 保留第一个重复值 ===
    订单号 客户ID     金额          日期
0  ORD001  C001  15800  2024-01-15
1  ORD002  C002   3200  2024-01-15
2  ORD003  C003  22500  2024-01-16
4  ORD004  C004   8500  2024-01-16
6  ORD005  C005  19800  2024-01-17

=== 保留最后一个重复值 ===
    订单号 客户ID     金额          日期
2  ORD003  C003  22500  2024-01-16
3  ORD001  C001  15800  2024-01-15
4  ORD004  C004   8500  2024-01-16
5  ORD002  C002   3200  2024-01-15
6  ORD005  C005  19800  2024-01-17

=== 删除所有重复行 ===
    订单号 客户ID     金额          日期
2  ORD003  C003  22500  2024-01-16
4  ORD004  C004   8500  2024-01-16
6  ORD005  C005  19800  2024-01-17</pre>
        </div>
        
        <h4>示例3：根据指定列删除重复值</h4>
        <div class="code-example">
            <pre># 根据订单号删除重复值
df_order = data.drop_duplicates(subset=['订单号'])
print("=== 根据订单号去重 ===")
print(df_order)

# 根据订单号和客户ID删除重复值
df_order_customer = data.drop_duplicates(subset=['订单号', '客户ID'])
print("\n=== 根据订单号和客户ID去重 ===")
print(df_order_customer)

# 统计去重前后的数据量
print("\n=== 去重统计 ===")
print(f"原始行数: {len(data)}")
print(f"去重后行数: {len(df_order)}")
print(f"删除重复行数: {len(data) - len(df_order)}")</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 根据订单号去重 ===
    订单号 客户ID     金额          日期
0  ORD001  C001  15800  2024-01-15
1  ORD002  C002   3200  2024-01-15
2  ORD003  C003  22500  2024-01-16
4  ORD004  C004   8500  2024-01-16
6  ORD005  C005  19800  2024-01-17

=== 根据订单号和客户ID去重 ===
    订单号 客户ID     金额          日期
0  ORD001  C001  15800  2024-01-15
1  ORD002  C002   3200  2024-01-15
2  ORD003  C003  22500  2024-01-16
4  ORD004  C004   8500  2024-01-16
6  ORD005  C005  19800  2024-01-17

=== 去重统计 ===
原始行数: 7
去重后行数: 5
删除重复行数: 2</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 检测重复值应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. df.duplicated()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. df.drop_duplicates()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. df.unique()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. df.distinct()</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：duplicated()方法用于检测重复值，返回布尔Series。drop_duplicates()用于删除重复值；unique()用于获取唯一值；distinct()不是Pandas方法。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 删除重复值时保留最后一个出现的，应该设置哪个参数？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">A. keep='first'</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">B. keep='last'</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. keep=True</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. keep=False</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：B</p>
                <p>解析：keep='last'表示保留最后一个出现的重复值。keep='first'是默认值，保留第一个；keep=False删除所有重复行。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. 只根据'订单号'列检测重复值，应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. df.duplicated(subset=['订单号'])</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. df.duplicated(columns=['订单号'])</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. df.duplicated('订单号')</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. df.duplicated(by='订单号')</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：subset参数用于指定要检查的列，必须是列表形式。其他选项的参数名或格式不正确。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic7': {
        title: '异常值检测与处理',
        objectives: ['理解异常值的概念', '掌握使用Z-score检测异常值', '掌握使用IQR方法检测异常值', '掌握异常值的处理策略', '能独立处理真实数据中的异常值'],
        content: `
<div class="content-header">
    <h1 class="content-title">异常值检测与处理</h1>
    <p class="content-subtitle">掌握异常值检测和处理的核心方法</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>理解异常值的概念</li>
            <li>掌握使用Z-score检测异常值</li>
            <li>掌握使用IQR方法检测异常值</li>
            <li>掌握异常值的处理策略</li>
            <li>能独立处理真实数据中的异常值</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某零售公司的销售数据中存在异常值。由于数据录入错误或系统故障，某些产品的销量或单价出现了不合理的值，例如单价为负数、销量超过库存等。作为数据分析师，你需要检测这些异常值并进行处理，确保后续分析的准确性。异常值会严重影响统计分析结果，导致错误的业务决策。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>什么是异常值？</h4>
        <p>异常值是指数据集中与其他数据显著不同的值。它们可能是数据录入错误、测量误差或真实的极端值。异常值会影响均值、标准差等统计量的计算，导致分析结果失真。</p>
        
        <h4>Z-score方法</h4>
        <p>Z-score表示数据点与均值的标准差倍数。通常认为Z-score绝对值大于3的数据点是异常值。计算公式为：Z = (X - μ) / σ，其中μ是均值，σ是标准差。Z-score方法适用于数据近似正态分布的情况。</p>
        
        <h4>IQR方法</h4>
        <p>IQR（四分位距）方法通过计算数据的上下限来检测异常值。计算公式为：Q1 - 1.5*IQR 和 Q3 + 1.5*IQR，其中Q1是第一四分位数，Q3是第三四分位数，IQR = Q3 - Q1。IQR方法对数据分布没有假设，适用性更广。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：使用Z-score检测异常值</h4>
        <div class="code-example">
            <pre>import pandas as pd
import numpy as np

# 创建包含异常值的数据
data = pd.DataFrame({
    '产品名称': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    '销量': [120, 150, 180, 200, 220, 250, 1000, 185],
    '单价': [50, 60, 70, 55, 65, 75, 60, -10]
})

print("=== 原始数据 ===")
print(data)

# 计算Z-score
from scipy import stats
z_scores = np.abs(stats.zscore(data[['销量', '单价']]))
print("\n=== Z-score ===")
print(z_scores)

# 检测异常值（Z-score > 3）
outliers_z = (z_scores > 3).any(axis=1)
print("\n=== Z-score检测的异常值 ===")
print(data[outliers_z])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 原始数据 ===
  产品名称   销量  单价
0      A  120   50
1      B  150   60
2      C  180   70
3      D  200   55
4      E  220   65
5      F  250   75
6      G  1000   60
7      H  185  -10

=== Z-score ===
         销量       单价
0  0.589294  0.465210
1  0.420924  0.155070
2  0.252554  0.930420
3  0.151532  0.310140
4  0.050511  0.620280
5  0.148533  1.240561
6  3.808401  0.155070
7  0.227780  2.791261

=== Z-score检测的异常值 ===
  产品名称   销量  单价
6      G  1000   60</pre>
        </div>
        
        <h4>示例2：使用IQR方法检测异常值</h4>
        <div class="code-example">
            <pre># 计算IQR
Q1 = data['销量'].quantile(0.25)
Q3 = data['销量'].quantile(0.75)
IQR = Q3 - Q1

# 计算上下限
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

print("=== IQR统计 ===")
print(f"Q1: {Q1}, Q3: {Q3}, IQR: {IQR}")
print(f"下限: {lower_bound}, 上限: {upper_bound}")

# 检测异常值
outliers_iqr = (data['销量'] < lower_bound) | (data['销量'] > upper_bound)
print("\n=== IQR检测的销量异常值 ===")
print(data[outliers_iqr])

# 检测单价异常值（负数）
price_outliers = data['单价'] < 0
print("\n=== 单价异常值（负数） ===")
print(data[price_outliers])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== IQR统计 ===
Q1: 165.0, Q3: 230.0, IQR: 65.0
下限: 67.5, 上限: 327.5

=== IQR检测的销量异常值 ===
  产品名称   销量  单价
6      G  1000   60

=== 单价异常值（负数） ===
  产品名称   销量  单价
7      H  185  -10</pre>
        </div>
        
        <h4>示例3：处理异常值</h4>
        <div class="code-example">
            <pre># 方法1：删除异常值
df_clean = data[(z_scores < 3).all(axis=1)]
df_clean = df_clean[df_clean['单价'] >= 0]
print("=== 删除异常值后 ===")
print(df_clean)

# 方法2：用中位数填充异常值
df_filled = data.copy()
# 销量异常值用中位数填充
median_sales = df_filled['销量'].median()
df_filled.loc[outliers_iqr, '销量'] = median_sales
# 单价异常值用均值填充
mean_price = df_filled[df_filled['单价'] >= 0]['单价'].mean()
df_filled.loc[price_outliers, '单价'] = mean_price
print("\n=== 填充异常值后 ===")
print(df_filled)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 删除异常值后 ===
  产品名称   销量  单价
0      A  120   50
1      B  150   60
2      C  180   70
3      D  200   55
4      E  220   65
5      F  250   75

=== 填充异常值后 ===
  产品名称   销量    单价
0      A  120  50.0
1      B  150  60.0
2      C  180  70.0
3      D  200  55.0
4      E  220  65.0
5      F  250  75.0
6      G  190  60.0
7      H  185  63.7</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. Z-score方法通常认为绝对值大于多少的是异常值？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. 3</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. 2</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. 1.5</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. 2.5</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：通常认为Z-score绝对值大于3的数据点是异常值，这对应于正态分布中约0.3%的极端值。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. IQR方法中，异常值的下限是？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. Q1 - 1.5 * IQR</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. Q1 - IQR</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. Q3 - 1.5 * IQR</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. Q1 - 2 * IQR</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：IQR方法中，异常值的下限是Q1 - 1.5 * IQR，上限是Q3 + 1.5 * IQR。Q1是第一四分位数，Q3是第三四分位数。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. 以下哪种不是常见的异常值处理方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">A. 删除异常值</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. 用均值/中位数填充</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. 标记为异常值单独处理</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">D. 忽略异常值继续分析</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：D</p>
                <p>解析：忽略异常值继续分析会导致分析结果失真，是不正确的做法。正确的处理方法包括删除、填充、标记等。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic8': {
        title: '数据类型转换',
        objectives: ['理解Pandas的数据类型', '掌握astype方法进行类型转换', '掌握to_datetime方法转换日期', '理解category类型的使用', '能独立进行数据类型转换'],
        content: `
<div class="content-header">
    <h1 class="content-title">数据类型转换</h1>
    <p class="content-subtitle">掌握数据类型转换的核心方法</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>理解Pandas的数据类型</li>
            <li>掌握astype方法进行类型转换</li>
            <li>掌握to_datetime方法转换日期</li>
            <li>理解category类型的使用</li>
            <li>能独立进行数据类型转换</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某公司的销售数据从数据库导出后，日期字段被当作字符串存储，金额字段被当作文本存储。作为数据分析师，你需要将这些数据转换为正确的类型：日期字段转换为datetime类型，金额字段转换为数值类型，产品类别转换为category类型。正确的数据类型是进行时间序列分析、数值计算和分组统计的基础。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>Pandas数据类型</h4>
        <p>Pandas支持多种数据类型：object（字符串）、int（整数）、float（浮点数）、datetime64（日期时间）、bool（布尔值）、category（分类类型）。正确的数据类型可以提高计算效率和节省内存。</p>
        
        <h4>astype()方法</h4>
        <p>astype()用于将列转换为指定类型。常用参数包括dtype（目标类型）。需要注意的是，如果转换失败会抛出错误，因此在转换前需要确保数据格式正确。</p>
        
        <h4>to_datetime()方法</h4>
        <p>to_datetime()专门用于将字符串转换为日期时间类型。常用参数包括format（日期格式）、errors（处理错误的方式）。日期转换是时间序列分析的基础。</p>
        
        <h4>Category类型</h4>
        <p>category类型用于表示有限的离散值，适合存储产品类别、地区等重复出现的值。category类型可以节省内存并提高分组操作的性能。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：查看和转换基本数据类型</h4>
        <div class="code-example">
            <pre>import pandas as pd

# 创建数据类型不正确的数据
data = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD003', 'ORD004'],
    '日期': ['2024-01-15', '2024-01-16', '2024-01-17', '2024-01-18'],
    '金额': ['15800', '3200', '22500', '8500'],
    '数量': ['2', '1', '3', '5'],
    '类别': ['电子产品', '办公用品', '电子产品', '配件']
})

print("=== 原始数据类型 ===")
print(data.dtypes)

print("\n=== 原始数据 ===")
print(data)

# 转换数据类型
data['金额'] = data['金额'].astype(float)
data['数量'] = data['数量'].astype(int)

print("\n=== 转换后的数据类型 ===")
print(data.dtypes)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 原始数据类型 ===
订单号    object
日期      object
金额      object
数量      object
类别      object
dtype: object

=== 原始数据 ===
    订单号         日期     金额 数量    类别
0  ORD001  2024-01-15  15800  2  电子产品
1  ORD002  2024-01-16   3200  1  办公用品
2  ORD003  2024-01-17  22500  3  电子产品
3  ORD004  2024-01-18   8500  5    配件

=== 转换后的数据类型 ===
订单号     object
日期       object
金额      float64
数量        int64
类别       object
dtype: object</pre>
        </div>
        
        <h4>示例2：转换日期类型</h4>
        <div class="code-example">
            <pre># 转换日期类型
data['日期'] = pd.to_datetime(data['日期'])

print("=== 日期类型转换后 ===")
print(data.dtypes)
print("\n日期列:", data['日期'].tolist())

# 提取日期信息
data['年'] = data['日期'].dt.year
data['月'] = data['日期'].dt.month
data['日'] = data['日期'].dt.day
data['星期'] = data['日期'].dt.day_name()

print("\n=== 提取日期信息后 ===")
print(data[['日期', '年', '月', '日', '星期']])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 日期类型转换后 ===
订单号             object
日期      datetime64[ns]
金额              float64
数量                int64
类别               object
dtype: object

日期列: [Timestamp('2024-01-15 00:00:00'), Timestamp('2024-01-16 00:00:00'), Timestamp('2024-01-17 00:00:00'), Timestamp('2024-01-18 00:00:00')]

=== 提取日期信息后 ===
          日期     年  月   日       星期
0 2024-01-15  2024  1  15    Monday
1 2024-01-16  2024  1  16   Tuesday
2 2024-01-17  2024  1  17 Wednesday
3 2024-01-18  2024  1  18  Thursday</pre>
        </div>
        
        <h4>示例3：使用category类型</h4>
        <div class="code-example">
            <pre># 转换为category类型
data['类别'] = data['类别'].astype('category')

print("=== Category类型转换后 ===")
print(data.dtypes)
print("\n类别列的类别:", data['类别'].cat.categories.tolist())

# 查看内存使用
print("\n=== 内存使用对比 ===")
print("转换前:", data.memory_usage().sum(), "bytes")

# category类型的优势
data_large = pd.concat([data] * 1000, ignore_index=True)
print(f"大型数据(4000行)内存使用: {data_large.memory_usage().sum()} bytes")

# 分组统计
print("\n=== 按类别分组统计 ===")
print(data.groupby('类别')['金额'].sum())</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== Category类型转换后 ===
订单号             object
日期      datetime64[ns]
金额              float64
数量                int64
类别             category
dtype: object

类别列的类别: ['办公用品', '电子产品', '配件']

=== 内存使用对比 ===
转换前: 368 bytes
大型数据(4000行)内存使用: 56088 bytes

=== 按类别分组统计 ===
类别
办公用品     3200.0
电子产品    38300.0
配件        8500.0
Name: 金额, dtype: float64</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 将字符串类型的日期转换为datetime类型应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. pd.to_datetime()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. df.astype('datetime')</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. df.to_date()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. df.convert_datetime()</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：pd.to_datetime()是专门用于将字符串转换为日期时间类型的函数，支持各种日期格式。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 以下哪种不是Pandas的标准数据类型？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">A. int64</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. datetime64</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. category</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">D. string</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：D</p>
                <p>解析：Pandas中字符串类型使用object表示，虽然有string类型但不是标准默认类型。int64、datetime64、category都是标准类型。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. category类型的主要优势是什么？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. 节省内存并提高分组性能</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">B. 支持更多操作</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">C. 可以存储更多值</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, false)">D. 计算速度更快</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：category类型通过将重复的字符串值映射为整数编码来节省内存，同时提高分组和聚合操作的性能。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic9': {
        title: 'groupby分组聚合',
        objectives: ['理解groupby的概念', '掌握groupby基本用法', '掌握常用聚合函数', '掌握多列分组', '能独立完成分组统计分析'],
        content: `
<div class="content-header">
    <h1 class="content-title">groupby分组聚合</h1>
    <p class="content-subtitle">掌握分组统计分析的核心方法</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>理解groupby的概念</li>
            <li>掌握groupby基本用法</li>
            <li>掌握常用聚合函数</li>
            <li>掌握多列分组</li>
            <li>能独立完成分组统计分析</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某电商公司需要分析各地区、各品类的销售情况。作为数据分析师，你需要按地区分组统计销售额，按产品类别分组统计销量，同时分析不同地区不同类别的销售差异。分组聚合是数据分析中最常用的操作之一，能够帮助我们从不同维度理解数据。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>什么是groupby?</h4>
        <p>groupby是Pandas中用于分组聚合的核心操作。它将数据按照指定的列进行分组，然后对每个分组应用聚合函数。groupby操作分为三个步骤：split（拆分）、apply（应用）、combine（合并）。</p>
        
        <h4>常用聚合函数</h4>
        <p>常用的聚合函数包括：sum()（求和）、mean()（均值）、count()（计数）、max()（最大值）、min()（最小值）、median()（中位数）等。可以通过agg()方法一次性应用多个聚合函数。</p>
        
        <h4>多列分组</h4>
        <p>groupby支持按多列进行分组，这在需要从多个维度分析数据时非常有用。例如按地区和类别同时分组，可以分析不同地区不同类别的销售情况。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：基本分组聚合</h4>
        <div class="code-example">
            <pre>import pandas as pd

# 创建销售数据
data = pd.DataFrame({
    '地区': ['北京', '上海', '广州', '北京', '上海', '广州', '北京', '上海'],
    '类别': ['电子产品', '电子产品', '电子产品', '办公用品', '办公用品', '办公用品', '电子产品', '办公用品'],
    '产品': ['手机', '电脑', '平板', '打印机', '复印机', '传真机', '耳机', '订书机'],
    '销量': [120, 80, 95, 45, 30, 25, 200, 150],
    '单价': [3999, 6999, 2999, 1299, 2999, 899, 199, 29]
})

print("=== 原始数据 ===")
print(data)

# 按地区分组求和
group_region = data.groupby('地区')['销量'].sum()
print("\n=== 按地区分组销量总和 ===")
print(group_region)

# 按类别分组求均值
group_category = data.groupby('类别')[['销量', '单价']].mean()
print("\n=== 按类别分组均值 ===")
print(group_category)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 原始数据 ===
   地区    类别   产品  销量    单价
0  北京  电子产品   手机  120  3999
1  上海  电子产品   电脑   80  6999
2  广州  电子产品   平板   95  2999
3  北京  办公用品  打印机   45  1299
4  上海  办公用品  复印机   30  2999
5  广州  办公用品  传真机   25   899
6  北京  电子产品   耳机  200   199
7  上海  办公用品  订书机  150    29

=== 按地区分组销量总和 ===
地区
上海    260
北京    365
广州    120
Name: 销量, dtype: int64

=== 按类别分组均值 ===
          销量      单价
类别                  
办公用品   62.5   809.0
电子产品  123.75  3549.0</pre>
        </div>
        
        <h4>示例2：多列分组和多聚合函数</h4>
        <div class="code-example">
            <pre># 多列分组
group_multi = data.groupby(['地区', '类别'])['销量'].sum()
print("=== 按地区和类别分组销量总和 ===")
print(group_multi)

# 多层索引转换为列
print("\n=== 转换为DataFrame ===")
print(group_multi.unstack())

# 应用多个聚合函数
group_agg = data.groupby('地区')['销量'].agg(['sum', 'mean', 'max', 'min'])
print("\n=== 多个聚合函数 ===")
print(group_agg)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 按地区和类别分组销量总和 ===
地区  类别   
上海  办公用品    180
     电子产品     80
北京  办公用品     45
     电子产品    320
广州  办公用品     25
     电子产品     95
Name: 销量, dtype: int64

=== 转换为DataFrame ===
类别   办公用品  电子产品
地区              
上海     180      80
北京      45     320
广州      25      95

=== 多个聚合函数 ===
      sum    mean  max  min
地区                        
上海   260   65.00  150   30
北京   365   91.25  200   45
广州   120   60.00   95   25</pre>
        </div>
        
        <h4>示例3：自定义聚合函数</h4>
        <div class="code-example">
            <pre># 自定义聚合函数：计算销量占比
def sales_ratio(x):
    return x.sum() / data['销量'].sum() * 100

group_custom = data.groupby('地区')['销量'].agg(sales_ratio)
print("=== 各地区销量占比 ===")
print(group_custom.round(2))

# 使用字典指定不同列的聚合函数
group_dict = data.groupby('地区').agg({
    '销量': ['sum', 'mean'],
    '单价': ['max', 'min']
})
print("\n=== 不同列不同聚合函数 ===")
print(group_dict)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 各地区销量占比 ===
地区
上海    36.62
北京    51.13
广州    12.25
Name: 销量, dtype: float64

=== 不同列不同聚合函数 ===
      销量              单价     
      sum    mean   max   min
地区                          
上海   260   65.00  6999    29
北京   365   91.25  3999   199
广州   120   60.00  2999   899</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 按'类别'列分组，计算'销量'列的总和，正确的代码是？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. df.groupby('类别')['销量'].sum()</div>
                <div class="quiz-option">B. df.groupby('销量')['类别'].sum()</div>
                <div class="quiz-option">C. df.groupby(['类别', '销量']).sum()</div>
                <div class="quiz-option">D. df.sum().groupby('类别')</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：groupby('类别')按类别分组，['销量']选择销量列，sum()计算总和。选项B分组列和聚合列颠倒了；选项C是多列分组；选项D顺序错误。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 同时应用sum和mean聚合函数，应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. agg(['sum', 'mean'])</div>
                <div class="quiz-option">B. apply(['sum', 'mean'])</div>
                <div class="quiz-option">C. groupby(['sum', 'mean'])</div>
                <div class="quiz-option">D. aggregate(sum, mean)</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：agg()方法支持传入函数列表，一次应用多个聚合函数。apply()用于应用自定义函数；选项C和D语法错误。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. 按多列分组应该使用什么参数？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. groupby(['列1', '列2'])</div>
                <div class="quiz-option">B. groupby('列1', '列2')</div>
                <div class="quiz-option">C. groupby(columns=['列1', '列2'])</div>
                <div class="quiz-option">D. groupby(column=['列1', '列2'])</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：groupby()的参数应该是列名的列表。选项B语法错误；选项C和D参数名不正确。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic10': {
        title: '透视表与交叉表',
        objectives: ['理解透视表的概念', '掌握pivot_table方法', '掌握crosstab方法', '理解聚合函数的使用', '能独立创建透视表和交叉表'],
        content: `
<div class="content-header">
    <h1 class="content-title">透视表与交叉表</h1>
    <p class="content-subtitle">掌握数据透视分析的核心方法</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>理解透视表的概念</li>
            <li>掌握pivot_table方法</li>
            <li>掌握crosstab方法</li>
            <li>理解聚合函数的使用</li>
            <li>能独立创建透视表和交叉表</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某零售公司需要制作月度销售报表，需要按地区和产品类别统计销售额。作为数据分析师，你需要创建透视表来展示不同维度的销售数据，帮助管理层快速了解销售情况。透视表是数据分析中非常强大的工具，可以灵活地从多个维度展示数据。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>透视表(Pivot Table)</h4>
        <p>透视表是一种交互式的表格，可以对数据进行分组和聚合，将行和列进行互换，从不同角度分析数据。pivot_table()方法的主要参数包括：index（行索引）、columns（列索引）、values（值）、aggfunc（聚合函数）、fill_value（填充缺失值）。</p>
        
        <h4>交叉表(Cross Tabulation)</h4>
        <p>交叉表是一种特殊的透视表，用于计算两个或多个分类变量的频数。crosstab()方法的主要参数包括：index（行变量）、columns（列变量）、values（值）、aggfunc（聚合函数）、normalize（归一化）。</p>
        
        <h4>聚合函数</h4>
        <p>透视表和交叉表都支持多种聚合函数，包括sum、mean、count、max、min等。默认情况下，pivot_table使用mean，crosstab使用count。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：创建基本透视表</h4>
        <div class="code-example">
            <pre>import pandas as pd

# 创建销售数据
data = pd.DataFrame({
    '地区': ['北京', '上海', '广州', '北京', '上海', '广州', '北京', '上海', '广州', '北京'],
    '类别': ['电子产品', '电子产品', '电子产品', '办公用品', '办公用品', '办公用品', '电子产品', '电子产品', '办公用品', '办公用品'],
    '月份': ['1月', '1月', '1月', '1月', '1月', '1月', '2月', '2月', '2月', '2月'],
    '销量': [120, 80, 95, 45, 30, 25, 150, 100, 80, 60],
    '销售额': [15800, 12500, 9800, 5200, 3800, 2100, 18900, 15200, 6500, 7200]
})

print("=== 原始数据 ===")
print(data)

# 创建透视表：按地区和类别统计销量
pivot1 = pd.pivot_table(data, 
                        index='地区', 
                        columns='类别', 
                        values='销量', 
                        aggfunc='sum',
                        fill_value=0)
print("\n=== 透视表1：按地区和类别统计销量 ===")
print(pivot1)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 原始数据 ===
   地区    类别  月份  销量   销售额
0  北京  电子产品  1月  120  15800
1  上海  电子产品  1月   80  12500
2  广州  电子产品  1月   95   9800
3  北京  办公用品  1月   45   5200
4  上海  办公用品  1月   30   3800
5  广州  办公用品  1月   25   2100
6  北京  电子产品  2月  150  18900
7  上海  电子产品  2月  100  15200
8  广州  办公用品  2月   80   6500
9  北京  办公用品  2月   60   7200

=== 透视表1：按地区和类别统计销量 ===
类别   办公用品  电子产品
地区              
上海      30      180
北京     105      270
广州     105       95</pre>
        </div>
        
        <h4>示例2：多维度透视表</h4>
        <div class="code-example">
            <pre># 多索引透视表
pivot2 = pd.pivot_table(data,
                        index=['地区', '月份'],
                        columns='类别',
                        values='销售额',
                        aggfunc='sum',
                        fill_value=0)
print("=== 多索引透视表 ===")
print(pivot2)

# 添加合计行和列
pivot3 = pd.pivot_table(data,
                        index='地区',
                        columns='类别',
                        values='销售额',
                        aggfunc='sum',
                        fill_value=0,
                        margins=True,
                        margins_name='总计')
print("\n=== 带合计的透视表 ===")
print(pivot3)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 多索引透视表 ===
类别       办公用品  电子产品
地区 月份              
上海 1月     3800   12500
    2月        0   15200
北京 1月     5200   15800
    2月     7200   18900
广州 1月     2100    9800
    2月     6500       0

=== 带合计的透视表 ===
类别   办公用品  电子产品     总计
地区                         
上海    3800   27700   31500
北京   12400   34700   47100
广州    8600    9800   18400
总计   24800   72200   97000</pre>
        </div>
        
        <h4>示例3：交叉表</h4>
        <div class="code-example">
            <pre># 创建交叉表：统计地区和类别的频数
cross1 = pd.crosstab(data['地区'], data['类别'])
print("=== 交叉表1：地区和类别的频数 ===")
print(cross1)

# 带值的交叉表
cross2 = pd.crosstab(data['地区'], 
                     data['类别'], 
                     values=data['销量'], 
                     aggfunc='sum')
print("\n=== 交叉表2：地区和类别的销量总和 ===")
print(cross2)

# 归一化交叉表
cross3 = pd.crosstab(data['地区'], 
                     data['类别'], 
                     normalize=True) * 100
print("\n=== 归一化交叉表（百分比） ===")
print(cross3.round(1))</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 交叉表1：地区和类别的频数 ===
类别  办公用品  电子产品
地区              
上海      1      2
北京      2      2
广州      2      1

=== 交叉表2：地区和类别的销量总和 ===
类别   办公用品  电子产品
地区              
上海      30      180
北京     105      270
广州     105       95

=== 归一化交叉表（百分比） ===
类别   办公用品  电子产品
地区              
上海    10.0    20.0
北京    20.0    20.0
广州    20.0    10.0</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 创建透视表应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. pd.pivot_table()</div>
                <div class="quiz-option">B. pd.crosstab()</div>
                <div class="quiz-option">C. df.pivot()</div>
                <div class="quiz-option">D. df.table()</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：pd.pivot_table()是创建透视表的标准方法。crosstab()用于创建交叉表；pivot()是简单的数据透视，不支持聚合。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 交叉表默认使用什么聚合函数？</div>
            <div class="quiz-options">
                <div class="quiz-option">A. sum</div>
                <div class="quiz-option">B. mean</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">C. count</div>
                <div class="quiz-option">D. max</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：C</p>
                <p>解析：crosstab()默认使用count函数统计频数。pivot_table()默认使用mean函数。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. 在透视表中添加合计行和列应该设置哪个参数？</div>
            <div class="quiz-options">
                <div class="quiz-option">A. total=True</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">B. margins=True</div>
                <div class="quiz-option">C. add_total=True</div>
                <div class="quiz-option">D. grand_total=True</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：B</p>
                <p>解析：margins=True参数可以在透视表中添加合计行和列，margins_name参数可以设置合计的名称。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic11': {
        title: '多表合并（merge、concat）',
        objectives: ['理解表合并的概念', '掌握merge方法进行表连接', '掌握concat方法进行表拼接', '理解不同连接类型', '能独立完成多表合并操作'],
        content: `
<div class="content-header">
    <h1 class="content-title">多表合并（merge、concat）</h1>
    <p class="content-subtitle">掌握多表合并的核心方法</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>理解表合并的概念</li>
            <li>掌握merge方法进行表连接</li>
            <li>掌握concat方法进行表拼接</li>
            <li>理解不同连接类型</li>
            <li>能独立完成多表合并操作</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某电商公司需要整合来自不同系统的数据，包括订单数据、产品数据和客户数据。订单表包含订单ID、产品ID、客户ID、数量、金额等信息；产品表包含产品ID、产品名称、类别、单价等信息；客户表包含客户ID、客户名称、地区等信息。作为数据分析师，你需要将这些表合并在一起，进行综合分析。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>merge方法</h4>
        <p>merge用于按照指定的列将两个DataFrame进行连接，类似SQL中的JOIN操作。主要参数包括：left（左表）、right（右表）、on（连接键）、how（连接类型：inner、outer、left、right）、left_on/right_on（左右表的连接键）、suffixes（重复列名的后缀）。</p>
        
        <h4>concat方法</h4>
        <p>concat用于沿着指定轴将多个DataFrame进行拼接。主要参数包括：objs（DataFrame列表）、axis（拼接轴，0为行拼接，1为列拼接）、join（拼接方式：inner、outer）、ignore_index（是否重置索引）。</p>
        
        <h4>连接类型</h4>
        <p>inner join（内连接）只保留两个表都有的键；outer join（外连接）保留所有键；left join（左连接）保留左表所有键；right join（右连接）保留右表所有键。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：基本merge操作</h4>
        <div class="code-example">
            <pre>import pandas as pd

# 创建订单表
orders = pd.DataFrame({
    '订单ID': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005'],
    '产品ID': ['P001', 'P002', 'P003', 'P001', 'P004'],
    '客户ID': ['C001', 'C002', 'C001', 'C003', 'C002'],
    '数量': [2, 1, 3, 1, 5],
    '金额': [7998, 6999, 8997, 3999, 345]
})

# 创建产品表
products = pd.DataFrame({
    '产品ID': ['P001', 'P002', 'P003', 'P005'],
    '产品名称': ['手机', '电脑', '平板', '耳机'],
    '类别': ['电子产品', '电子产品', '电子产品', '配件'],
    '单价': [3999, 6999, 2999, 199]
})

print("=== 订单表 ===")
print(orders)
print("\n=== 产品表 ===")
print(products)

# 内连接
merged_inner = pd.merge(orders, products, on='产品ID')
print("\n=== 内连接结果 ===")
print(merged_inner)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 订单表 ===
    订单ID 产品ID 客户ID  数量    金额
0  ORD001  P001  C001    2   7998
1  ORD002  P002  C002    1   6999
2  ORD003  P003  C001    3   8997
3  ORD004  P001  C003    1   3999
4  ORD005  P004  C002    5    345

=== 产品表 ===
  产品ID 产品名称    类别    单价
0  P001    手机  电子产品  3999
1  P002    电脑  电子产品  6999
2  P003    平板  电子产品  2999
3  P005    耳机    配件   199

=== 内连接结果 ===
    订单ID 产品ID 客户ID  数量    金额 产品名称    类别    单价
0  ORD001  P001  C001    2   7998    手机  电子产品  3999
1  ORD004  P001  C003    1   3999    手机  电子产品  3999
2  ORD002  P002  C002    1   6999    电脑  电子产品  6999
3  ORD003  P003  C001    3   8997    平板  电子产品  2999</pre>
        </div>
        
        <h4>示例2：不同连接类型</h4>
        <div class="code-example">
            <pre># 左连接
merged_left = pd.merge(orders, products, on='产品ID', how='left')
print("=== 左连接结果 ===")
print(merged_left)

# 外连接
merged_outer = pd.merge(orders, products, on='产品ID', how='outer')
print("\n=== 外连接结果 ===")
print(merged_outer)

# 右连接
merged_right = pd.merge(orders, products, on='产品ID', how='right')
print("\n=== 右连接结果 ===")
print(merged_right)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 左连接结果 ===
    订单ID 产品ID 客户ID  数量    金额 产品名称    类别      单价
0  ORD001  P001  C001    2   7998    手机  电子产品  3999.0
1  ORD002  P002  C002    1   6999    电脑  电子产品  6999.0
2  ORD003  P003  C001    3   8997    平板  电子产品  2999.0
3  ORD004  P001  C003    1   3999    手机  电子产品  3999.0
4  ORD005  P004  C002    5    345   NaN    NaN     NaN

=== 外连接结果 ===
    订单ID 产品ID 客户ID   数量      金额 产品名称    类别      单价
0  ORD001  P001  C001   2.0   7998.0    手机  电子产品  3999.0
1  ORD004  P001  C003   1.0   3999.0    手机  电子产品  3999.0
2  ORD002  P002  C002   1.0   6999.0    电脑  电子产品  6999.0
3  ORD003  P003  C001   3.0   8997.0    平板  电子产品  2999.0
4  ORD005  P004  C002   5.0    345.0   NaN    NaN     NaN
5     NaN  P005   NaN   NaN      NaN    耳机    配件   199.0

=== 右连接结果 ===
    订单ID 产品ID 客户ID   数量      金额 产品名称    类别    单价
0  ORD001  P001  C001   2.0   7998.0    手机  电子产品  3999
1  ORD004  P001  C003   1.0   3999.0    手机  电子产品  3999
2  ORD002  P002  C002   1.0   6999.0    电脑  电子产品  6999
3  ORD003  P003  C001   3.0   8997.0    平板  电子产品  2999
4     NaN  P005   NaN   NaN      NaN    耳机    配件   199</pre>
        </div>
        
        <h4>示例3：concat拼接</h4>
        <div class="code-example">
            <pre># 创建两个相似的DataFrame
df1 = pd.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6]
})

df2 = pd.DataFrame({
    'A': [7, 8, 9],
    'B': [10, 11, 12]
})

df3 = pd.DataFrame({
    'C': [13, 14, 15],
    'D': [16, 17, 18]
})

# 行拼接
concat_rows = pd.concat([df1, df2], ignore_index=True)
print("=== 行拼接 ===")
print(concat_rows)

# 列拼接
concat_cols = pd.concat([df1, df3], axis=1)
print("\n=== 列拼接 ===")
print(concat_cols)

# 多个DataFrame拼接
concat_multi = pd.concat([df1, df2, df1], keys=['df1', 'df2', 'df1_copy'])
print("\n=== 多个DataFrame拼接 ===")
print(concat_multi)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 行拼接 ===
   A   B
0  1   4
1  2   5
2  3   6
3  7  10
4  8  11
5  9  12

=== 列拼接 ===
   A  B   C   D
0  1  4  13  16
1  2  5  14  17
2  3  6  15  18

=== 多个DataFrame拼接 ===
           A   B
df1        0  1   4
           1  2   5
           2  3   6
df2        0  7  10
           1  8  11
           2  9  12
df1_copy   0  1   4
           1  2   5
           2  3   6</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 按照指定列连接两个DataFrame应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. pd.merge()</div>
                <div class="quiz-option">B. pd.concat()</div>
                <div class="quiz-option">C. df.join()</div>
                <div class="quiz-option">D. df.combine()</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：pd.merge()用于按照指定键连接两个DataFrame，类似SQL的JOIN操作。concat用于拼接，join是基于索引的连接。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 保留左表所有数据的连接类型是？</div>
            <div class="quiz-options">
                <div class="quiz-option">A. inner</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">B. left</div>
                <div class="quiz-option">C. right</div>
                <div class="quiz-option">D. outer</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：B</p>
                <p>解析：left join保留左表所有行，右表中匹配不到的值用NaN填充。inner只保留匹配的行；right保留右表所有行；outer保留所有行。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. 沿着行方向拼接多个DataFrame应该设置哪个参数？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. axis=0</div>
                <div class="quiz-option">B. axis=1</div>
                <div class="quiz-option">C. axis='rows'</div>
                <div class="quiz-option">D. axis='columns'</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：axis=0表示沿着行方向拼接（垂直方向），axis=1表示沿着列方向拼接（水平方向）。默认值是axis=0。</p>
            </div>
        </div>
    </div>
</div>
`
    },
    
    'topic12': {
        title: '时间序列基础',
        objectives: ['理解时间序列数据', '掌握datetime类型操作', '掌握时间索引的使用', '掌握时间重采样', '能独立进行时间序列分析'],
        content: `
<div class="content-header">
    <h1 class="content-title">时间序列基础</h1>
    <p class="content-subtitle">掌握时间序列分析的核心方法</p>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>理解时间序列数据</li>
            <li>掌握datetime类型操作</li>
            <li>掌握时间索引的使用</li>
            <li>掌握时间重采样</li>
            <li>能独立进行时间序列分析</li>
        </ul>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💼 业务场景</h3>
        <p>某电商公司需要分析每日销售数据，包括销售额趋势、周环比、月同比等指标。作为数据分析师，你需要将日期字段转换为datetime类型，设置为索引，然后进行时间重采样，计算每日、每周、每月的销售额统计。时间序列分析是业务分析中非常重要的一环。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📚 详细讲解</h3>
        
        <h4>时间序列数据</h4>
        <p>时间序列数据是按时间顺序排列的数据。Pandas通过datetime64类型支持时间序列数据。将日期设置为索引后，可以方便地进行时间相关的操作。</p>
        
        <h4>时间索引</h4>
        <p>将日期列设置为索引可以方便地按时间筛选数据。DatetimeIndex支持丰富的时间相关操作，如按年份、月份、日期筛选数据。</p>
        
        <h4>时间重采样</h4>
        <p>resample()方法用于将时间序列数据转换为不同频率。常用的频率字符串包括：D（日）、W（周）、M（月）、Q（季度）、Y（年）、H（小时）等。重采样可以用于计算不同时间粒度的统计指标。</p>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>💻 代码示例</h3>
        
        <h4>示例1：创建时间序列数据</h4>
        <div class="code-example">
            <pre>import pandas as pd
import numpy as np

# 创建日期范围
dates = pd.date_range(start='2024-01-01', end='2024-01-10', freq='D')

# 创建时间序列数据
ts_data = pd.DataFrame({
    '日期': dates,
    '销售额': np.random.randint(1000, 5000, size=len(dates)),
    '订单数': np.random.randint(10, 50, size=len(dates))
})

print("=== 时间序列数据 ===")
print(ts_data)
print("\n数据类型:", ts_data['日期'].dtype)

# 设置时间索引
ts_data = ts_data.set_index('日期')
print("\n=== 设置时间索引后 ===")
print(ts_data.index)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 时间序列数据 ===
         日期   销售额  订单数
0 2024-01-01  2345    32
1 2024-01-02  4123    28
2 2024-01-03  1890    15
3 2024-01-04  3567    42
4 2024-01-05  2109    19
5 2024-01-06  4789    45
6 2024-01-07  1234    12
7 2024-01-08  3890    38
8 2024-01-09  2678    25
9 2024-01-10  4321    41

数据类型: datetime64[ns]

=== 设置时间索引后 ===
DatetimeIndex(['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04',
               '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08',
               '2024-01-09', '2024-01-10'],
              dtype='datetime64[ns]', name='日期', freq='D')</pre>
        </div>
        
        <h4>示例2：时间索引操作</h4>
        <div class="code-example">
            <pre># 按日期筛选
print("=== 筛选1月3日到1月6日的数据 ===")
print(ts_data['2024-01-03':'2024-01-06'])

# 提取日期属性
print("\n=== 提取日期属性 ===")
print("年份:", ts_data.index.year.unique())
print("月份:", ts_data.index.month.unique())
print("星期:", ts_data.index.day_name())

# 按星期分组
weekday_group = ts_data.groupby(ts_data.index.day_name())['销售额'].sum()
print("\n=== 按星期分组销售额 ===")
print(weekday_group)</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 筛选1月3日到1月6日的数据 ===
            销售额  订单数
日期                  
2024-01-03  1890    15
2024-01-04  3567    42
2024-01-05  2109    19
2024-01-06  4789    45

=== 提取日期属性 ===
年份: Int64Index([2024], dtype='int64')
月份: Int64Index([1], dtype='int64')
星期: Index(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
           'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
          dtype='object')

=== 按星期分组销售额 ===
日期
Friday        2109
Monday        5023
Saturday      4789
Sunday        1234
Thursday      3567
Tuesday       6794
Wednesday     4568
Name: 销售额, dtype: int64</pre>
        </div>
        
        <h4>示例3：时间重采样</h4>
        <div class="code-example">
            <pre># 按周重采样
weekly = ts_data.resample('W').sum()
print("=== 按周重采样 ===")
print(weekly)

# 按周重采样（自定义聚合）
weekly_custom = ts_data.resample('W').agg({
    '销售额': ['sum', 'mean'],
    '订单数': 'sum'
})
print("\n=== 按周重采样（多聚合函数） ===")
print(weekly_custom)

# 计算7日移动平均
ts_data['7日平均销售额'] = ts_data['销售额'].rolling(window=7).mean()
print("\n=== 7日移动平均 ===")
print(ts_data[['销售额', '7日平均销售额']])</pre>
        </div>
        <div class="result-box">
            <pre>运行结果：
=== 按周重采样 ===
            销售额  订单数
日期                  
2024-01-07  20057   183
2024-01-14  10889    104

=== 按周重采样（多聚合函数） ===
            销售额           订单数
            sum        mean  sum
日期                            
2024-01-07  20057  2865.285714  183
2024-01-14  10889  3629.666667  104

=== 7日移动平均 ===
            销售额    7日平均销售额
日期                           
2024-01-01  2345           NaN
2024-01-02  4123           NaN
2024-01-03  1890           NaN
2024-01-04  3567           NaN
2024-01-05  2109           NaN
2024-01-06  4789           NaN
2024-01-07  1234  2865.285714
2024-01-08  3890  2800.285714
2024-01-09  2678  2851.000000
2024-01-10  4321  3083.142857</pre>
        </div>
    </div>
</div>

<div class="content-card">
    <div class="course-content">
        <h3>📝 练习题</h3>
        
        <div class="quiz-item">
            <div class="quiz-question">1. 创建日期范围应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">A. pd.date_range()</div>
                <div class="quiz-option">B. pd.DatetimeIndex()</div>
                <div class="quiz-option">C. pd.to_datetime()</div>
                <div class="quiz-option">D. pd.create_dates()</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：A</p>
                <p>解析：pd.date_range()用于创建日期范围，支持start、end、periods、freq等参数。to_datetime()用于转换日期字符串。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">2. 按月份重采样应该使用哪个频率字符串？</div>
            <div class="quiz-options">
                <div class="quiz-option">A. 'D'</div>
                <div class="quiz-option">B. 'W'</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">C. 'M'</div>
                <div class="quiz-option">D. 'Y'</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：C</p>
                <p>解析：'M'表示月份，'D'表示日，'W'表示周，'Y'表示年。这些是Pandas重采样常用的频率字符串。</p>
            </div>
        </div>
        
        <div class="quiz-item">
            <div class="quiz-question">3. 计算移动平均应该使用哪个方法？</div>
            <div class="quiz-options">
                <div class="quiz-option">A. resample()</div>
                <div class="quiz-option" onclick="checkQuizAnswer(this, true)">B. rolling()</div>
                <div class="quiz-option">C. shift()</div>
                <div class="quiz-option">D. diff()</div>
            </div>
            <div class="quiz-explanation" style="display:none;">
                <h4>答案解析</h4>
                <p>正确答案：B</p>
                <p>解析：rolling()方法用于创建滚动窗口，可以计算移动平均、移动求和等。resample()用于时间重采样；shift()用于位移；diff()用于计算差分。</p>
            </div>
        </div>
    </div>
</div>
`
    }
};
