// 课程内容数据
export const courseContent = [
  {
    id: 'topic1',
    title: 'Pandas入门：Series与DataFrame',
    objectives: ['掌握Series的创建和基本操作', '掌握DataFrame的创建和基本操作', '理解索引和标签访问'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握Series的创建和基本操作</li>
          <li>掌握DataFrame的创建和基本操作</li>
          <li>理解索引和标签访问</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>某电商公司的运营团队需要分析近期的产品销售数据。他们的数据存储在Excel中，包含产品名称、销量、单价、销售额等信息。作为数据分析师，你需要使用Pandas来处理这些数据。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>什么是Series?</h3>
        <p>Series是Pandas的一维数据结构，可以看作是带有标签的数组。每个元素都有对应的索引（index）和值（value）。索引可以是整数或字符串，使得数据访问更加直观。</p>
        
        <h3>什么是DataFrame?</h3>
        <p>DataFrame是Pandas的二维数据结构，类似Excel表格或SQL表。它由行索引（index）和列名（columns）构成，每一列都是一个Series。DataFrame是数据分析中最常用的数据结构。</p>
        
        <h2>💻 代码示例</h2>
        <p>请查看下方的"代码示例"区域，这里提供了可交互的代码示例，包含复制功能和逐行解释。</p>
      </div>
    `,
    codeExamples: [
      {
        title: 'Series和DataFrame的创建',
        code: `import pandas as pd

# 创建Series
s = pd.Series([100, 200, 150, 250], 
             index=['1月', '2月', '3月', '4月'], 
             name='销量')
print("销量数据:")
print(s)

# 创建DataFrame
data = {
    '产品': ['苹果', '香蕉', '橙子'],
    '销量': [120, 200, 150],
    '价格': [5.5, 3.2, 4.8]
}
df = pd.DataFrame(data)
print("\\n产品数据:")
print(df)`,
        explanation: [
          { code: 'import pandas as pd', description: '导入Pandas库，这是使用Pandas进行数据分析的第一步。pd是Pandas的标准别名。' },
          { code: 's = pd.Series([100, 200, 150, 250])', description: '创建Series对象，传入一个列表作为数据。[100, 200, 150, 250]是四个数据点。' },
          { code: "index=['1月', '2月', '3月', '4月']", description: '为Series添加自定义索引，用四个字符串标签标识每列数据。' },
          { code: "name='销量'", description: '为整个Series设置名称为"销量"，方便识别数据含义。' },
          { code: 'print(s)', description: '打印Series，输出显示索引标签和对应的数值。' },
          { code: "data = {'产品': [...]}", description: '创建字典作为DataFrame的数据源，键是列名，值是列表。' },
          { code: 'df = pd.DataFrame(data)', description: '从字典创建DataFrame，自动使用字典的键作为列名。' },
          { code: 'print(df)', description: '打印DataFrame，以表格形式展示数据，包含行索引和列名。' }
        ]
      },
      {
        title: '从不同数据源创建Series',
        code: `import pandas as pd

# 从列表创建Series
s1 = pd.Series([10, 20, 30, 40], name='数值')
print("从列表创建:")
print(s1)

# 从字典创建Series（键会变成索引）
dict_data = {'北京': 1000, '上海': 1200, '广州': 900, '深圳': 1100}
s2 = pd.Series(dict_data, name='城市销售额')
print("\\n从字典创建:")
print(s2)

# 从单个标量创建
s3 = pd.Series(5, index=['a', 'b', 'c', 'd'])
print("\\n从标量创建:")
print(s3)`,
        explanation: [
          { code: 'pd.Series([10, 20, 30, 40])', description: '最基本的创建方式，从Python列表创建Series，自动使用0,1,2,3作为索引。' },
          { code: "dict_data = {'北京': 1000, ...}", description: '创建字典，键为城市名称，值为销售额。' },
          { code: 'pd.Series(dict_data)', description: '从字典创建Series时，字典的键会自动成为Series的索引，值成为Series的数值。' },
          { code: 'pd.Series(5, index=[...])', description: '从单个标量值创建Series时，必须同时指定索引，该值会被广播到所有索引位置。' }
        ]
      },
      {
        title: 'DataFrame的多种创建方式',
        code: `import pandas as pd

# 方式1：从字典创建（最常用）
data1 = {
    '姓名': ['张三', '李四', '王五'],
    '年龄': [25, 30, 28],
    '部门': ['技术', '市场', '销售']
}
df1 = pd.DataFrame(data1)
print("方式1 - 从字典创建:")
print(df1)

# 方式2：从列表的列表创建
data2 = [
    ['张三', 25, '技术'],
    ['李四', 30, '市场'],
    ['王五', 28, '销售']
]
df2 = pd.DataFrame(data2, columns=['姓名', '年龄', '部门'])
print("\\n方式2 - 从列表创建:")
print(df2)

# 方式3：从Series的字典创建
s_name = pd.Series(['张三', '李四', '王五'])
s_age = pd.Series([25, 30, 28])
df3 = pd.DataFrame({'姓名': s_name, '年龄': s_age})
print("\\n方式3 - 从Series字典创建:")
print(df3)`,
        explanation: [
          { code: "data1 = {'姓名': [...], '年龄': [...]}", description: '这是创建DataFrame最常用的方式，每个键对应一列数据。' },
          { code: 'pd.DataFrame(data1)', description: '字典中的键自动成为DataFrame的列名，列表长度必须一致。' },
          { code: "data2 = [['张三', 25, '技术'], ...]", description: '每个子列表代表一行数据，需要配合columns参数指定列名。' },
          { code: "columns=['姓名', '年龄', '部门']", description: '手动指定DataFrame的列名，与数据顺序对应。' },
          { code: "pd.DataFrame({'姓名': s_name, ...})", description: '可以将多个Series组合起来创建DataFrame，Series的索引会自动对齐。' }
        ]
      },
      {
        title: '数据访问和操作',
        code: `import pandas as pd

# 创建DataFrame
df = pd.DataFrame({
    '产品': ['苹果', '香蕉', '橙子'],
    '销量': [120, 200, 150],
    '价格': [5.5, 3.2, 4.8]
})

# 访问单列
print("销量列:")
print(df['销量'])

# 访问多行
print("\\n前2行:")
print(df.head(2))

# 计算新列
df['销售额'] = df['销量'] * df['价格']
print("\\n添加销售额列:")
print(df)`,
        explanation: [
          { code: "df['销量']", description: '使用列名访问DataFrame中的单列，返回一个Series对象。' },
          { code: 'df.head(2)', description: '返回DataFrame的前2行数据，常用于快速查看数据样本。' },
          { code: "df['销售额'] = df['销量'] * df['价格']", description: '通过计算创建新列，将销量和价格相乘得到销售额。' }
        ]
      },
      {
        title: '使用列名访问和修改数据',
        code: `import pandas as pd

# 创建销售数据
df = pd.DataFrame({
    '产品': ['苹果', '香蕉', '橙子', '葡萄', '西瓜'],
    '销量': [120, 200, 150, 80, 300],
    '价格': [5.5, 3.2, 4.8, 7.2, 2.5]
})

# 使用点操作符访问列
print("使用点操作符访问销量列:")
print(df.销量)

# 同时访问多个列
print("\\n访问产品和价格两列:")
print(df[['产品', '价格']])

# 修改列的值
df['价格'] = df['价格'] * 1.1  # 价格上涨10%
print("\\n价格上涨10%后:")
print(df)

# 删除列
df = df.drop('价格', axis=1)
print("\\n删除价格列后:")
print(df)`,
        explanation: [
          { code: 'df.销量', description: '如果列名是合法的Python变量名，可以使用点操作符访问，等价于df["销量"]。' },
          { code: "df[['产品', '价格']]", description: '使用列名的列表可以同时选择多个列，返回一个新的DataFrame。' },
          { code: "df['价格'] = df['价格'] * 1.1", description: '可以像操作普通变量一样直接对整列数据进行修改。' },
          { code: 'df.drop("价格", axis=1)', description: '删除指定列，axis=1表示按列操作（删除行使用axis=0）。' }
        ]
      },
      {
        title: '使用loc和iloc选择数据',
        code: `import pandas as pd

# 创建带自定义索引的DataFrame
df = pd.DataFrame({
    '产品': ['苹果', '香蕉', '橙子'],
    '销量': [120, 200, 150],
    '价格': [5.5, 3.2, 4.8]
}, index=['a', 'b', 'c'])

print("原始DataFrame:")
print(df)

# 使用loc按标签选择
print("\\nloc['a':'b']（按标签选择）:")
print(df.loc['a':'b'])

# 使用iloc按位置选择
print("\\niloc[0:2]（按位置选择前2行）:")
print(df.iloc[0:2])

# 选择特定行列
print("\\nloc[:, ['产品', '销量']]:")
print(df.loc[:, ['产品', '销量']])`,
        explanation: [
          { code: "index=['a', 'b', 'c']", description: '创建DataFrame时指定自定义索引标签，而不是默认的0,1,2。' },
          { code: "df.loc['a':'b']", description: 'loc使用索引标签进行切片，注意：切片是包含结束标签的！' },
          { code: 'df.iloc[0:2]', description: 'iloc使用整数位置进行切片，类似于Python列表的切片，不包含结束位置。' },
          { code: "df.loc[:, ['产品', '销量']]", description: '逗号前是行选择，逗号后是列选择，:表示选择所有行。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'Pandas中用于创建一维带标签数组的结构是？',
        options: ['A. DataFrame', 'B. Series', 'C. Array', 'D. List'],
        correct: 1,
        explanation: 'Series是Pandas的一维数据结构，每个元素都有对应的索引标签。DataFrame是二维结构。'
      },
      {
        id: 'q2',
        text: 'DataFrame的每一列是什么类型？',
        options: ['A. List', 'B. Array', 'C. Series', 'D. Dictionary'],
        correct: 2,
        explanation: 'DataFrame的每一列都是一个Series，它们共享同一个行索引。这是Pandas的核心设计之一。'
      },
      {
        id: 'q3',
        text: '创建一个Series，包含数据为[100,200,300]，索引为["a","b","c"]，正确的代码是？',
        options: [
          'A. pd.Series([100,200,300])',
          'B. pd.Series([100,200,300], index=["a","b","c"])',
          'C. pd.Series(index=["a","b","c"], data=[100,200,300])',
          'D. pd.Series(["a","b","c"], [100,200,300])'
        ],
        correct: 1,
        explanation: '创建自定义索引需要传递index参数，正确的语法是pd.Series(data, index=index_list)。'
      },
      {
        id: 'q4',
        text: 'DataFrame的每一行在访问时返回什么类型的对象？',
        options: ['A. List', 'B. Series', 'C. DataFrame', 'D. Dictionary'],
        correct: 1,
        explanation: 'DataFrame的每一行在访问时返回的是一个Series对象，包含该行的所有列名和对应值。Series索引即为DataFrame的列名。'
      },
      {
        id: 'q5',
        text: '创建DataFrame时，如何指定自定义行索引？',
        options: ['A. 使用columns参数', 'B. 使用index参数', 'C. 使用row参数', 'D. 无法指定，只能使用默认0,1,2索引'],
        correct: 1,
        explanation: '在创建DataFrame时，通过index参数可以指定自定义行索引，如df = pd.DataFrame(data, index=["一","二","三"])。columns参数用于指定列名。'
      }
    ]
  },
  {
    id: 'topic2',
    title: '数据读取与写入（CSV/Excel）',
    objectives: ['掌握read_csv/read_excel函数的使用', '掌握数据写入方法', '理解常用参数的作用'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握read_csv/read_excel函数的使用</li>
          <li>掌握数据写入方法</li>
          <li>理解常用参数的作用</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>某零售公司的销售部门每天都会生成Excel和CSV格式的销售报告。作为数据分析师，你需要定期导入这些文件进行清洗和分析，处理完后还需要将结果导出为新的文件供他人使用。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>read_csv()函数</h3>
        <p>read_csv()是Pandas最常用的数据读取函数。常用参数包括：filepath（文件路径）、sep（分隔符，默认逗号）、header（表头行，默认第0行）、index_col（设为某列作为索引）、dtype（指定列的数据类型）、encoding（文件编码，常用utf-8和gbk）。</p>
        
        <h3>read_excel()函数</h3>
        <p>read_excel()用于读取Excel文件，需要安装openpyxl（支持.xlsx）或xlrd（支持.xls）库。常用参数包括：sheet_name（工作表名称或索引）、header（表头行）。</p>
        
        <h3>数据写入</h3>
        <p>to_csv()和to_excel()方法用于将DataFrame写入文件。index=False可以避免写入行号，encoding参数指定编码格式。</p>
      </div>
    `,
    codeExamples: [
      {
        title: '读取和保存CSV文件',
        code: `import pandas as pd

# 读取CSV文件（假设文件存在）
df = pd.read_csv('sales.csv', encoding='utf-8')
print("CSV文件内容:")
print(df.head())

# 读取带分隔符的文件
df2 = pd.read_csv('data.txt', sep='\\t')
print("\\nTab分隔文件:")
print(df2.head())

# 保存为CSV
df.to_csv('output.csv', index=False, encoding='utf-8')
print("\\n文件已保存为 output.csv")`,
        explanation: [
          { code: "pd.read_csv('sales.csv', encoding='utf-8')", description: '读取CSV文件，指定UTF-8编码。' },
          { code: "pd.read_csv('data.txt', sep='\\t')", description: '读取Tab分隔的文本文件。' },
          { code: "df.to_csv('output.csv', index=False)", description: '保存DataFrame为CSV文件，index=False表示不保存行索引。' }
        ]
      },
      {
        title: '读取和保存Excel文件',
        code: `import pandas as pd

# 读取Excel文件
df = pd.read_excel('sales.xlsx', sheet_name='Sheet1')
print("Excel文件内容:")
print(df.head())

# 读取指定工作表
df2 = pd.read_excel('data.xlsx', sheet_name='2024年数据')
print("\\n指定工作表:")
print(df2.head())

# 保存为Excel
df.to_excel('output.xlsx', index=False, sheet_name='结果')
print("\\n文件已保存为 output.xlsx")`,
        explanation: [
          { code: "pd.read_excel('sales.xlsx', sheet_name='Sheet1')", description: '读取Excel文件，指定工作表名称。' },
          { code: "df.to_excel('output.xlsx', index=False)", description: '保存为Excel文件，不包含行索引。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'read_csv()函数的哪个参数用于指定分隔符？',
        options: ['A. delimiter', 'B. sep', 'C. split', 'D. delimiter和sep都可以'],
        correct: 3,
        explanation: 'read_csv()函数中sep和delimiter参数都可以用于指定分隔符，它们是等价的。'
      },
      {
        id: 'q2',
        text: '读取Excel文件需要安装哪个库？',
        options: ['A. pandas', 'B. numpy', 'C. openpyxl或xlrd', 'D. matplotlib'],
        correct: 2,
        explanation: '读取.xlsx文件需要openpyxl库，读取.xls文件需要xlrd库。'
      },
      {
        id: 'q3',
        text: '保存CSV文件时如何避免写入行号？',
        options: ['A. df.save_csv()', 'B. df.to_csv(index=False)', 'C. df.write_csv()', 'D. df.save(index=False)'],
        correct: 1,
        explanation: '使用to_csv()方法的index=False参数可以避免将行索引写入CSV文件。'
      },
      {
        id: 'q4',
        text: '读取.xlsx格式的Excel文件时，默认使用哪个引擎？',
        options: ['A. xlrd', 'B. openpyxl', 'C. pandas', 'D. xlsxwriter'],
        correct: 1,
        explanation: 'openpyxl是Pandas读取和写入.xlsx格式Excel文件的默认引擎，需要单独安装。xlrd用于读取旧版.xls文件。'
      },
      {
        id: 'q5',
        text: '使用pd.read_csv()读取包含中文的文件时，最常用的编码参数是？',
        options: ['A. gbk 或 utf-8', 'B. ascii', 'C. latin-1', 'D. unicode'],
        correct: 0,
        explanation: 'encoding参数用于指定文件编码，中文数据常用gbk或utf-8编码。gbk是Windows中文系统默认编码，utf-8是跨平台通用编码。'
      }
    ]
  },
  {
    id: 'topic3',
    title: '数据选择与过滤',
    objectives: ['掌握单列和多列的选择方法', '掌握行过滤的布尔索引技术', '理解loc和iloc的区别'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握单列和多列的选择方法</li>
          <li>掌握行过滤的布尔索引技术</li>
          <li>理解loc和iloc的区别</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>在销售数据分析中，你经常需要从大量数据中筛选出满足特定条件的记录。比如查看所有销量超过100的产品、分析某个地区的销售数据，或者找出价格在特定范围内的商品。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>列选择</h3>
        <p>DataFrame支持多种列选择方式：单列用df['列名']或df.列名，多列用df[['列1','列2']]，按条件选择列可用df.filter()方法。</p>
        
        <h3>布尔索引</h3>
        <p>布尔索引是Pandas最强大的数据过滤技术。通过创建布尔条件（如df['销量']>100），返回布尔Series，然后用它过滤行。多个条件可用&（与）、|（或）、~（非）组合。</p>
        
        <h3>loc和iloc</h3>
        <p>loc基于标签索引，iloc基于整数位置索引。loc[行条件, 列条件]用于按标签选择，iloc[行号, 列号]用于按位置选择。</p>
      </div>
    `,
    codeExamples: [
      {
        title: '列选择与多条件过滤',
        code: `import pandas as pd

df = pd.DataFrame({
    '产品': ['苹果', '香蕉', '橙子', '葡萄', '西瓜'],
    '销量': [120, 200, 150, 80, 300],
    '价格': [5.5, 3.2, 4.8, 8.0, 2.5]
})

# 选择单列
print("销量列:")
print(df['销量'])

# 选择多列
print("\\n产品和销量:")
print(df[['产品', '销量']])

# 布尔过滤
high_sales = df[df['销量'] > 100]
print("\\n销量>100的产品:")
print(high_sales)

# 多条件过滤
result = df[(df['销量'] > 100) & (df['价格'] < 6)]
print("\\n销量>100且价格<6:")
print(result)`,
        explanation: [
          { code: "df['销量']", description: '选择单列，返回Series对象。' },
          { code: "df[['产品', '销量']]", description: '选择多列，需要传入列表。' },
          { code: "df[df['销量'] > 100]", description: '布尔索引过滤，筛选出销量大于100的行。' },
          { code: "df[(df['销量'] > 100) & (df['价格'] < 6)]", description: '多条件过滤，使用&表示AND关系。' }
        ]
      },
      {
        title: 'loc和iloc的使用',
        code: `import pandas as pd

df = pd.DataFrame({
    '产品': ['苹果', '香蕉', '橙子'],
    '销量': [120, 200, 150],
    '价格': [5.5, 3.2, 4.8]
}, index=['a', 'b', 'c'])

print("DataFrame:")
print(df)

# loc基于标签
print("\\nloc['a':'b']（按标签选择）:")
print(df.loc['a':'b'])

# iloc基于整数位置
print("\\niloc[0:2]（按位置选择前2行）:")
print(df.iloc[0:2])

# 组合使用
print("\\nloc[所有行, ['产品', '销量']]:")
print(df.loc[:, ['产品', '销量']])`,
        explanation: [
          { code: "df.loc['a':'b']", description: 'loc基于标签切片，包括端点。按行标签a到b选择。' },
          { code: 'df.iloc[0:2]', description: 'iloc基于整数位置切片，不包括端点。选择前2行（索引0和1）。' },
          { code: "df.loc[:, ['产品', '销量']]", description: '选择所有行，但只选择指定的两列。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: '如何选择DataFrame中的多列？',
        options: ['A. df[列名]', 'B. df[[列名]]', 'C. df[[列1, 列2]]', 'D. df.select(列1, 列2)'],
        correct: 2,
        explanation: '选择多列需要传入列表，如df[["列1", "列2"]]。'
      },
      {
        id: 'q2',
        text: 'loc和iloc的主要区别是什么？',
        options: ['A. loc更快', 'B. loc基于标签，iloc基于位置', 'C. iloc更灵活', 'D. 没有区别'],
        correct: 1,
        explanation: 'loc通过标签选择数据，iloc通过整数位置选择数据。'
      },
      {
        id: 'q3',
        text: '哪个符号用于组合多个布尔条件（AND关系）？',
        options: ['A. AND', 'B. &&', 'C. &', 'D. and'],
        correct: 2,
        explanation: '在Pandas中，使用&表示AND，|表示OR，~表示NOT。注意用括号包围每个条件。'
      },
      {
        id: 'q4',
        text: 'iloc使用什么进行数据选择？',
        options: ['A. 列名', 'B. 整数位置索引', 'C. 行标签', 'D. 布尔值'],
        correct: 1,
        explanation: 'iloc使用整数位置（0, 1, 2...）来选择数据，类似于Python列表的索引方式，而loc使用行/列标签。'
      },
      {
        id: 'q5',
        text: '布尔索引返回的Series包含什么类型的值？',
        options: ['A. 整数', 'B. 字符串', 'C. True/False布尔值', 'D. 浮点数'],
        correct: 2,
        explanation: '布尔索引创建的条件表达式返回布尔Series，True表示满足条件的行，False表示不满足的行。这些布尔值用于过滤DataFrame。'
      }
    ]
  },
  {
    id: 'topic4',
    title: '数据清洗（缺失值、重复值、异常值）',
    objectives: ['掌握识别和处理缺失值的方法', '学会检测和删除重复数据', '能够识别和处理异常值'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握识别和处理缺失值的方法</li>
          <li>学会检测和删除重复数据</li>
          <li>能够识别和处理异常值</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>某电商平台收集了大量用户数据用于分析，但数据中存在各种问题：部分用户信息缺失、商品价格出现负数、同一用户被重复记录等。作为数据分析师，你需要清洗这些脏数据，确保分析的准确性。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>缺失值处理</h3>
        <p>缺失值（NaN/None）是数据分析中最常见的问题。isnull()和notnull()用于检测缺失值。dropna()删除含有缺失值的行或列，fillna()用指定值填充缺失值。fillna()还支持method参数用前向或后向填充。</p>
        
        <h3>重复值处理</h3>
        <p>duplicated()返回布尔Series标识重复行，drop_duplicates()删除重复行。可以指定subset参数基于特定列判断重复。</p>
        
        <h3>异常值处理</h3>
        <p>异常值（outliers）是偏离正常范围的数据点。常用方法包括：基于统计的方法（超过均值±3倍标准差）、基于四分位数的方法（超过Q1-1.5*IQR或Q3+1.5*IQR）。处理方式包括删除、替换或保留（根据业务需求）。</p>
      </div>
    `,
    codeExamples: [
      {
        title: '缺失值检测与处理',
        code: `import pandas as pd
import numpy as np

# 创建包含缺失值的数据
df = pd.DataFrame({
    '产品': ['苹果', '香蕉', None, '橙子'],
    '销量': [120, np.nan, 150, 80],
    '价格': [5.5, 3.2, 4.8, np.nan]
})

print("原始数据:")
print(df)

# 检测缺失值
print("\\n缺失值统计:")
print(df.isnull().sum())

# 删除含有缺失值的行
df_clean = df.dropna()
print("\\n删除缺失值后的数据:")
print(df_clean)

# 用均值填充缺失值
df['销量'] = df['销量'].fillna(df['销量'].mean())
print("\\n填充后的数据:")
print(df)`,
        explanation: [
          { code: 'df.isnull().sum()', description: '统计每列的缺失值数量。isnull()返回布尔DataFrame，sum()对每列求和。' },
          { code: 'df.dropna()', description: '删除任何含有NaN的行。也可使用axis参数删除含有缺失值的列。' },
          { code: "df['销量'].fillna(df['销量'].mean())", description: '用该列的均值填充缺失值。fillna()支持多种填充策略。' }
        ]
      },
      {
        title: '重复值与异常值处理',
        code: `import pandas as pd
import numpy as np

# 创建包含重复和异常值的数据
df = pd.DataFrame({
    '产品': ['苹果', '香蕉', '苹果', '橙子', '葡萄', '西瓜'],
    '销量': [120, 200, 120, 150, 80, 1000],  # 1000是异常值
    '价格': [5.5, 3.2, 5.5, 4.8, 8.0, -5]  # -5是异常值
})

print("原始数据:")
print(df)

# 检测重复
print("\\n重复行检测:")
print(df.duplicated())

# 删除重复行
df_no_dup = df.drop_duplicates()
print("\\n删除重复后:")
print(df_no_dup)

# 基于IQR检测异常值
Q1 = df['销量'].quantile(0.25)
Q3 = df['销量'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

print(f"\\n异常值范围: [{lower}, {upper}]")
outliers = df[(df['销量'] < lower) | (df['销量'] > upper)]
print("异常值:")
print(outliers)`,
        explanation: [
          { code: 'df.duplicated()', description: '返回一个布尔Series，标识与之前行重复的行。' },
          { code: 'df.drop_duplicates()', description: '删除重复行，保留第一次出现的记录。可用keep参数指定保留哪条。' },
          { code: "Q1 = df['销量'].quantile(0.25)", description: '计算第一四分位数（25%分位数），quantile()用于计算任意分位数。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: '哪个函数用于检测DataFrame中的缺失值？',
        options: ['A. is_empty()', 'B. isnull()', 'C. is_missing()', 'D. has_na()'],
        correct: 1,
        explanation: 'isnull()函数返回布尔DataFrame，标识每个位置是否为缺失值。'
      },
      {
        id: 'q2',
        text: '删除重复行的方法是？',
        options: ['A. delete_duplicates()', 'B. drop_duplicates()', 'C. remove_duplicates()', 'D. clear_duplicates()'],
        correct: 1,
        explanation: 'drop_duplicates()方法用于删除重复行，默认为保留第一条记录。'
      },
      {
        id: 'q3',
        text: 'IQR方法中，异常值的范围是？',
        options: ['A. mean ± 2*std', 'B. Q1-1.5*IQR 到 Q3+1.5*IQR', 'C. min到max', 'D. Q1到Q3'],
        correct: 1,
        explanation: '基于四分位距(IQR)的异常值检测，上界为Q3+1.5*IQR，下界为Q1-1.5*IQR。'
      },
      {
        id: 'q4',
        text: '检测DataFrame中缺失值的函数是？',
        options: ['A. check_missing()', 'B. isnull()或isna()', 'C. find_na()', 'D. has_none()'],
        correct: 1,
        explanation: 'isnull()和isna()函数都可以返回布尔DataFrame，标识每个位置是否为缺失值（NaN或None），两个函数功能完全相同。'
      },
      {
        id: 'q5',
        text: '使用drop_duplicates()删除重复行时，默认保留哪条记录？',
        options: ['A. 最后一次出现的记录', 'B. 第一次出现的记录', 'C. 随机保留一条', 'D. 不保留，全部删除'],
        correct: 1,
        explanation: 'drop_duplicates()默认keep="first"，即保留第一次出现的记录，删除后续重复的记录。也可以设置keep="last"保留最后一条。'
      }
    ]
  },
  {
    id: 'topic5',
    title: '数据聚合（groupby/agg/transform）',
    objectives: ['掌握groupby分组操作', '学会使用agg进行聚合计算', '理解transform和apply的区别'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握groupby分组操作</li>
          <li>学会使用agg进行聚合计算</li>
          <li>理解transform和apply的区别</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>某连锁超市有多家门店，每家门店每天销售不同类别的商品。管理层需要了解各类别在各门店的销售额、各门店的总销售额、以及每个类别占总销售额的比例。你需要对销售数据进行分组聚合分析。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>groupby分组</h3>
        <p>groupby()是Pandas最强大的数据分析函数之一。它按照一个或多个列的值将数据分组，返回GroupBy对象。分组后可以链式调用聚合函数如sum()、mean()、count()、max()、min()等。</p>
        
        <h3>agg多聚合</h3>
        <p>agg()函数允许同时应用多个聚合计算。可以传入字符串（聚合函数名）或元组列表（列名，函数名）实现对不同列使用不同聚合。</p>
        
        <h3>transform</h3>
        <p>transform()对每个元素执行计算，返回与原DataFrame相同形状的结果。与agg不同，transform保持原数据的维度，常用于计算组内排名、组内标准化等。</p>
      </div>
    `,
    codeExamples: [
      {
        title: 'groupby基础分组聚合',
        code: `import pandas as pd

# 模拟门店销售数据
df = pd.DataFrame({
    '门店': ['北京店', '上海店', '北京店', '广州店', '上海店'],
    '类别': ['食品', '饮料', '饮料', '食品', '食品'],
    '销售额': [1200, 800, 600, 1500, 900]
})

print("销售数据:")
print(df)

# 按门店分组求和
print("\\n各门店销售额:")
print(df.groupby('门店')['销售额'].sum())

# 按多个列分组
print("\\n各门店各类别销售额:")
print(df.groupby(['门店', '类别'])['销售额'].sum())

# 使用agg同时计算多个指标
print("\\n各门店统计:")
result = df.groupby('门店').agg({
    '销售额': ['sum', 'mean', 'count']
}).round(2)
print(result)`,
        explanation: [
          { code: "df.groupby('门店')['销售额'].sum()", description: '按门店分组，选取销售额列，计算总和。' },
          { code: "df.groupby(['门店', '类别'])", description: '按多个列分组，产生多级索引。' },
          { code: "df.groupby('门店').agg({'销售额': ['sum', 'mean', 'count']})", description: 'agg同时计算多个聚合指标，使用字典指定列和函数。' }
        ]
      },
      {
        title: 'transform实现组内计算',
        code: `import pandas as pd

df = pd.DataFrame({
    '门店': ['北京店', '北京店', '上海店', '上海店', '广州店'],
    '月份': [1, 2, 1, 2, 1],
    '销售额': [1200, 1500, 800, 900, 1100]
})

# 计算每个门店占总销售额的比例
df['总销售额'] = df.groupby('门店')['销售额'].transform('sum')
df['占比'] = (df['销售额'] / df['总销售额'] * 100).round(2)
print("各门店销售占比:")
print(df)

# 组内排名
df['销售额排名'] = df.groupby('门店')['销售额'].rank(method='dense', ascending=False)
print("\\n组内排名:")
print(df[['门店', '月份', '销售额', '销售额排名']])`,
        explanation: [
          { code: "df.groupby('门店')['销售额'].transform('sum')", description: 'transform返回与原DataFrame相同长度的结果，每行填充分组后的汇总值。' },
          { code: 'df.groupby("门店")["销售额"].rank()', description: 'rank()在分组内计算排名，method="dense"表示紧凑排名（无间隔）。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'groupby返回的对象类型是？',
        options: ['A. DataFrame', 'B. Series', 'C. GroupBy对象', 'D. DataFrameGroupBy'],
        correct: 2,
        explanation: 'groupby()返回GroupBy对象，不是直接的DataFrame或Series。'
      },
      {
        id: 'q2',
        text: 'agg和transform的主要区别是？',
        options: ['A. agg更快', 'B. agg返回聚合结果，transform返回与原数据相同形状', 'C. transform更快', 'D. 没有区别'],
        correct: 1,
        explanation: 'agg返回聚合后的汇总数据（维度减少），transform返回与原数据相同维度的结果。'
      },
      {
        id: 'q3',
        text: '如何按多个列进行分组？',
        options: ['A. groupby([列1, 列2])', 'B. groupby(列1).groupby(列2)', 'C. groupby(列1 & 列2)', 'D. groupby(列1).and(列2)'],
        correct: 0,
        explanation: 'groupby()接受一个列名列表来按多列分组，如df.groupby(["门店", "类别"])。'
      },
      {
        id: 'q4',
        text: 'groupby返回的GroupBy对象调用agg()后，数据维度会发生什么变化？',
        options: ['A. 保持不变', 'B. 维度减少（行数变少）', 'C. 维度增加（行数变多）', 'D. 取决于数据'],
        correct: 1,
        explanation: 'agg()执行聚合操作后，数据维度会减少（行数变少），因为多个行会被合并为一个聚合结果。而transform()保持原数据维度不变。'
      },
      {
        id: 'q5',
        text: '使用transform计算组内占比时，通常需要先计算组内的什么？',
        options: ['A. 平均值', 'B. 总和', 'C. 最大值', 'D. 中位数'],
        correct: 1,
        explanation: '计算组内占比需要先用transform("sum")计算组内总和，然后用每行的值除以组总和得到占比。这样每行都能对应到自己组的总和。'
      }
    ]
  },
  {
    id: 'topic6',
    title: '数据合并（merge/concat/join）',
    objectives: ['掌握merge实现SQL风格的表连接', '学会使用concat合并数据', '理解不同连接类型的区别'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握merge实现SQL风格的表连接</li>
          <li>学会使用concat合并数据</li>
          <li>理解不同连接类型的区别</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>某公司有三个数据源：销售数据（包含产品ID）、产品信息（包含产品ID和名称）、客户信息（包含客户ID和名称）。你需要将这些数据合并成一个完整的分析数据集。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>merge表连接</h3>
        <p>merge()类似于SQL的JOIN，通过一个或多个键合并两个DataFrame。常用参数包括：on（连接键）、how（连接方式：left/right/inner/outer）、left_on/right_on（键名不同时使用）。</p>
        
        <h3>concat数据拼接</h3>
        <p>concat()用于沿着轴向拼接多个DataFrame。axis=0时纵向拼接（增加行），axis=1时横向拼接（增加列）。ignore_index=True可重置索引。</p>
        
        <h3>join索引连接</h3>
        <p>join()基于索引连接DataFrame，比merge更简洁，但功能相对较少。适合简单场景。</p>
      </div>
    `,
    codeExamples: [
      {
        title: 'merge实现表连接',
        code: `import pandas as pd

# 创建销售数据和产品信息
sales = pd.DataFrame({
    '订单ID': [1, 2, 3, 4],
    '产品ID': [101, 102, 103, 101],
    '数量': [2, 1, 3, 2]
})

products = pd.DataFrame({
    '产品ID': [101, 102, 103],
    '产品名': ['苹果', '香蕉', '橙子'],
    '单价': [5.5, 3.2, 4.8]
})

print("销售数据:")
print(sales)
print("\\n产品信息:")
print(products)

# 内连接（inner）- 只保留两边都有的键
result_inner = pd.merge(sales, products, on='产品ID', how='inner')
print("\\n内连接结果:")
print(result_inner)

# 左连接（left）- 保留左边所有记录
result_left = pd.merge(sales, products, on='产品ID', how='left')
print("\\n左连接结果:")
print(result_left)

# 计算销售额
result_left['销售额'] = result_left['数量'] * result_left['单价']
print("\\n添加销售额后:")
print(result_left)`,
        explanation: [
          { code: "pd.merge(sales, products, on='产品ID')", description: '基于产品ID列合并两个DataFrame，默认为内连接。' },
          { code: "how='left'", description: '左连接保留左边DataFrame的所有记录，右边没有匹配则为NaN。' },
          { code: "result_left['销售额'] = result_left['数量'] * result_left['单价']", description: '合并后可以直接计算新列。' }
        ]
      },
      {
        title: 'concat数据拼接',
        code: `import pandas as pd

# 创建两个DataFrame
df1 = pd.DataFrame({
    '姓名': ['张三', '李四'],
    '年龄': [25, 30]
})

df2 = pd.DataFrame({
    '姓名': ['王五', '赵六'],
    '年龄': [28, 22]
})

df3 = pd.DataFrame({
    '姓名': ['张三', '李四'],
    '城市': ['北京', '上海']
})

print("DataFrame 1:")
print(df1)
print("\\nDataFrame 2:")
print(df2)

# 纵向拼接（增加行）
result_concat = pd.concat([df1, df2], ignore_index=True)
print("\\n纵向拼接结果:")
print(result_concat)

# 横向拼接（增加列）
result_merge = pd.merge(df1, df3, on='姓名')
print("\\n横向合并结果:")
print(result_merge)`,
        explanation: [
          { code: 'pd.concat([df1, df2])', description: 'concat沿轴向拼接数据，默认为纵向（axis=0），增加行。' },
          { code: 'ignore_index=True', description: '忽略原有索引，创建新的整数索引。' },
          { code: "pd.merge(df1, df3, on='姓名')", description: 'merge用于横向合并，基于共同键连接两个表。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'merge函数中，how参数有哪些选项？',
        options: ['A. left, right, center', 'B. inner, outer, cross', 'C. left, right, inner, outer', 'D. join, union, intersect'],
        correct: 2,
        explanation: 'merge的how参数有四个选项：left（左连接）、right（右连接）、inner（内连接）、outer（外连接）。'
      },
      {
        id: 'q2',
        text: 'concat默认沿哪个轴拼接？',
        options: ['A. axis=0（纵向）', 'B. axis=1（横向）', 'C. axis=2', 'D. 不确定'],
        correct: 0,
        explanation: 'concat默认axis=0，表示纵向拼接（增加行）。axis=1表示横向拼接（增加列）。'
      },
      {
        id: 'q3',
        text: '左连接（left join）保留哪些记录？',
        options: ['A. 只保留两边都有的', 'B. 保留左边所有，右边没有匹配的填NaN', 'C. 保留右边所有', 'D. 保留所有，没有匹配的也填NaN'],
        correct: 1,
        explanation: '左连接保留左边DataFrame的所有记录，右边没有匹配对应键的记录填NaN。'
      },
      {
        id: 'q4',
        text: 'concat默认沿哪个轴拼接数据？',
        options: ['A. axis=0（纵向，增加行数）', 'B. axis=1（横向，增加列数）', 'C. axis=2', 'D. 取决于数据大小'],
        correct: 0,
        explanation: 'concat默认axis=0，表示纵向拼接（增加行数）。axis=1表示横向拼接（增加列数）。'
      },
      {
        id: 'q5',
        text: 'merge函数中，哪个参数用于指定连接方式？',
        options: ['A. join', 'B. how', 'C. method', 'D. type'],
        correct: 1,
        explanation: 'how参数指定连接类型：inner（内连接，只保留两边都有的键）、outer（外连接，保留所有键）、left、right等。'
      }
    ]
  },
  {
    id: 'topic7',
    title: '时间序列处理（datetime/resample/shift）',
    objectives: ['掌握datetime类型转换', '学会使用resample重采样', '理解shift和rolling的计算方法'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握datetime类型转换</li>
          <li>学会使用resample重采样</li>
          <li>理解shift和rolling的计算方法</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>某电商平台的销售系统记录了每天的销售数据。分析师需要：计算每日/每周/每月的销售额、分析销售额的日/周/月增长率、预测下个月的销售额。这些都需要时间序列处理技术。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>datetime转换</h3>
        <p>pd.to_datetime()将字符串转换为datetime类型。parse_dates=True在read_csv时自动解析日期列。转换为datetime后，可以提取年、月、日、星期等属性。</p>
        
        <h3>resample重采样</h3>
        <p>resample()是时间序列数据最重要的函数之一，用于将数据聚合到不同的时间频率。常用参数：'D'（日）、'W'（周）、'M'（月）、'Q'（季）、'Y'（年）。</p>
        
        <h3>shift移动</h3>
        <p>shift()移动数据索引，用于计算增长率、差异等。periods参数指定移动位数，freq指定时间频率。shift(1)获取前一行数据。</p>
      </div>
    `,
    codeExamples: [
      {
        title: 'datetime处理与重采样',
        code: `import pandas as pd

# 创建时间序列数据
dates = pd.date_range('2024-01-01', periods=10, freq='D')
df = pd.DataFrame({
    '日期': dates,
    '销售额': [1200, 1500, 1300, 1800, 2000, 1900, 2100, 2300, 2200, 2500]
})
df['日期'] = pd.to_datetime(df['日期'])

print("原始数据:")
print(df)

# 设置日期为索引
df.set_index('日期', inplace=True)

# 计算日增长率
df['日增长率'] = df['销售额'].pct_change().round(4) * 100
print("\\n添加日增长率:")
print(df)

# 按月重采样求和
df_monthly = df['销售额'].resample('W').sum()
print("\\n周销售汇总:")
print(df_monthly)`,
        explanation: [
          { code: "pd.to_datetime(df['日期'])", description: '将日期列转换为datetime类型，使其具有日期特性。' },
          { code: "df['销售额'].pct_change()", description: '计算百分比变化，即（当前值-前一个值）/前一个值。' },
          { code: "df['销售额'].resample('W').sum()", description: '按周（W）重采样，计算每周的销售额总和。' }
        ]
      },
      {
        title: 'shift与rolling滑动窗口',
        code: `import pandas as pd

dates = pd.date_range('2024-01-01', periods=7, freq='D')
df = pd.DataFrame({
    '日期': dates,
    '销售额': [1200, 1500, 1300, 1800, 2000, 1900, 2100]
})
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)

# shift移动
df['前一天销售额'] = df['销售额'].shift(1)
df['环比增长'] = df['销售额'] - df['销售额'].shift(1)
print("shift计算:")
print(df)

# rolling滑动窗口
df['3日均值'] = df['销售额'].rolling(window=3).mean()
df['3日最大值'] = df['销售额'].rolling(window=3).max()
print("\\n滚动计算:")
print(df)`,
        explanation: [
          { code: "df['销售额'].shift(1)", description: 'shift(1)将数据向下移动1位，可以用来获取前一行或前几行的值。' },
          { code: "df['销售额'].rolling(window=3).mean()", description: 'rolling创建滑动窗口，window=3表示每次计算最近3个值的统计量。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: '将字符串转换为datetime类型的函数是？',
        options: ['A. str_to_datetime()', 'B. to_datetime()', 'C. parse_datetime()', 'D. datetime()'],
        correct: 1,
        explanation: 'pd.to_datetime()是Pandas中用于将字符串或其他类型转换为datetime的函数。'
      },
      {
        id: 'q2',
        text: 'resample(\'M\')表示什么时间频率？',
        options: ['A. 日', 'B. 周', 'C. 月', 'D. 年'],
        correct: 2,
        explanation: 'resample中\'M\'表示月度（Month），\'W\'表示周，\'D\'表示日，\'Y\'表示年。'
      },
      {
        id: 'q3',
        text: 'shift(1)和rolling(window=3)的区别是？',
        options: ['A. shift计算单行偏移，rolling计算窗口聚合', 'B. 没有区别', 'C. rolling更快', 'D. shift返回多列'],
        correct: 0,
        explanation: 'shift移动数据位置获取前一行/列的值；rolling计算滑动窗口内的聚合统计量。'
      },
      {
        id: 'q4',
        text: '将字符串日期转换为datetime类型使用的函数是？',
        options: ['A. to_date()', 'B. pd.to_datetime()', 'C. parse_date()', 'D. datetime()'],
        correct: 1,
        explanation: 'pd.to_datetime()是Pandas中用于将字符串转换为datetime类型的标准函数，转换后可以提取年、月、日、星期等属性进行时间分析。'
      },
      {
        id: 'q5',
        text: 'resample的哪个参数用于指定时间频率？',
        options: ['A. freq', 'B. time', 'C. period', 'D. rate'],
        correct: 0,
        explanation: 'resample的第一个位置参数就是时间频率："D"表示日、"W"表示周、"M"表示月、"Q"表示季度、"Y"表示年等。'
      }
    ]
  },
  {
    id: 'topic8',
    title: '数据可视化（plot/matplotlib集成）',
    objectives: ['掌握DataFrame的plot方法', '学会创建常用图表类型', '理解matplotlib集成使用'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握DataFrame的plot方法</li>
          <li>学会创建常用图表类型</li>
          <li>理解matplotlib集成使用</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>数据分析不仅要会处理数据，还需要将结果可视化展示给决策者。你需要为销售报告创建多种图表：月销售额趋势图、各产品销量对比柱状图、销售额占比饼图等，让数据更直观易懂。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>plot快速绘图</h3>
        <p>DataFrame.plot()是Pandas内置的绘图方法，封装了matplotlib。常用参数：kind（图表类型：line/bar/scatter/pie等）、title（标题）、xlabel/ylabel（坐标轴标签）、figsize（图形大小）、grid（网格线）。</p>
        
        <h3>常用图表类型</h3>
        <p>line（折线图）：展示趋势变化。bar/barh（柱状图）：对比分类数据。pie（饼图）：展示占比。scatter（散点图）：展示两个变量关系。hist（直方图）：展示分布。box（箱线图）：展示统计特征。</p>
        
        <h3>matplotlib集成</h3>
        <p>Pandas绘图基于matplotlib，可以通过plt.figure()、plt.legend()、plt.savefig()等自定义图表。%matplotlib inline用于Jupyter中显示图表。</p>
      </div>
    `,
    codeExamples: [
      {
        title: '基础图表绘制',
        code: `import pandas as pd
import matplotlib.pyplot as plt

# 准备数据
df = pd.DataFrame({
    '月份': ['1月', '2月', '3月', '4月', '5月', '6月'],
    '销售额': [12000, 15000, 13000, 18000, 22000, 25000],
    '成本': [8000, 9500, 8500, 11000, 13000, 15000]
})

# 绑销售额趋势
df.plot(x='月份', y='销售额', kind='line', title='月度销售额趋势', 
        figsize=(10, 6), grid=True, marker='o')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.tight_layout()
plt.savefig('trend.png')
plt.show()

# 柱状图
df.plot(x='月份', y=['销售额', '成本'], kind='bar', figsize=(10, 6), title='月度销售对比')
plt.tight_layout()
plt.show()`,
        explanation: [
          { code: "df.plot(x='月份', y='销售额', kind='line')", description: '创建折线图，x轴为月份，y轴为销售额。kind参数指定图表类型。' },
          { code: 'plt.tight_layout()', description: '自动调整子图参数，使标签不重叠。' },
          { code: "df.plot(x='月份', y=[...], kind='bar')", description: '创建柱状图，可以同时绘制多列进行对比。' }
        ]
      },
      {
        title: '高级图表类型',
        code: `import pandas as pd
import matplotlib.pyplot as plt

# 创建数据
df = pd.DataFrame({
    '产品': ['食品', '饮料', '服装', '电器', '家居'],
    '销售额': [35000, 28000, 42000, 18000, 25000]
})

# 饼图
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

df.plot(ax=axes[0], x='产品', y='销售额', kind='pie', 
        autopct='%1.1f%%', startangle=90, title='产品销售额占比')
axes[0].set_ylabel('')

# 条形图（横向）
df.plot(ax=axes[1], x='产品', y='销售额', kind='barh', 
         color='skyblue', title='产品销售额对比')
axes[1].set_xlabel('销售额')

plt.tight_layout()
plt.show()

# 散点图示例
df2 = pd.DataFrame({
    '广告投入': [1000, 2000, 3000, 4000, 5000],
    '销售额': [8000, 15000, 22000, 30000, 38000]
})
df2.plot(x='广告投入', y='销售额', kind='scatter', s=100, c='red', title='广告投入与销售额关系')
plt.tight_layout()
plt.show()`,
        explanation: [
          { code: 'fig, axes = plt.subplots(1, 2)', description: '创建1行2列的子图，返回图形对象和轴对象列表。' },
          { code: "kind='pie', autopct='%1.1f%%'", description: '饼图自动显示百分比，保留一位小数。' },
          { code: "kind='scatter'", description: '散点图用于展示两个数值变量的关系。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'DataFrame.plot()中，kind参数用于指定什么？',
        options: ['A. 颜色', 'B. 图表类型', 'C. 数据源', 'D. 标题'],
        correct: 1,
        explanation: 'kind参数指定图表类型，如line、bar、pie、scatter等。'
      },
      {
        id: 'q2',
        text: '创建子图时，如何获取多个轴对象？',
        options: ['A. plt.subplots()返回一个元组', 'B. 使用subplot()', 'C. 使用plot()多次', 'D. 不能创建子图'],
        correct: 0,
        explanation: 'plt.subplots()返回一个包含图形对象和轴对象列表的元组，可以用fig, axes = plt.subplots()解包。'
      },
      {
        id: 'q3',
        text: '哪种图表最适合展示数据的占比关系？',
        options: ['A. 折线图', 'B. 柱状图', 'C. 饼图', 'D. 散点图'],
        correct: 2,
        explanation: '饼图最适合展示各部分占整体的比例关系，能直观显示百分比。'
      },
      {
        id: 'q4',
        text: 'DataFrame.plot()的哪个参数用于指定图表类型？',
        options: ['A. type', 'B. kind', 'C. chart', 'D. style'],
        correct: 1,
        explanation: 'kind参数指定图表类型：line（折线图）、bar（柱状图）、pie（饼图）、scatter（散点图）、hist（直方图）等是最常用的选项。'
      },
      {
        id: 'q5',
        text: '使用plt.savefig()保存图表时，文件格式如何决定？',
        options: ['A. 通过format参数指定', 'B. 根据文件名扩展名自动决定', 'C. 默认都是.png格式', 'D. 通过dpi参数决定'],
        correct: 1,
        explanation: 'plt.savefig()根据文件名的扩展名自动决定保存格式，如.png、.jpg、.pdf等。也可以显式通过format参数指定。'
      }
    ]
  },
  {
    id: 'topic9',
    title: '分组与透视表（pivot_table/crosstab）',
    objectives: ['掌握pivot_table创建透视表', '学会使用crosstab快速统计', '能够处理多层索引和聚合'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握pivot_table创建透视表</li>
          <li>学会使用crosstab快速统计</li>
          <li>能够处理多层索引和聚合</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>销售经理需要从多个维度分析销售数据：不同地区、不同月份、不同产品类别的交叉分析。Excel中的透视表功能强大，但Pandas的pivot_table和crosstab可以更灵活地完成这类分析任务。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>pivot_table透视表</h3>
        <p>pivot_table是数据分析的利器，可以按照行索引和列索引对数据进行分组聚合。常用参数：values（要聚合的值）、index（行索引）、columns（列索引）、aggfunc（聚合函数，默认mean）、fill_value（填充缺失值）、margins（添加汇总行/列）。</p>
        
        <h3>crosstab交叉表</h3>
        <p>crosstab专门用于计算两个（或多个）分类变量的频数表。适合快速查看变量间的分布关系，性能优于手动groupby+count。</p>
      </div>
    `,
    codeExamples: [
      {
        title: 'pivot_table透视表创建',
        code: `import pandas as pd

# 创建销售数据
df = pd.DataFrame({
    '门店': ['北京', '北京', '上海', '上海', '广州', '广州'],
    '月份': ['1月', '1月', '1月', '2月', '2月', '2月'],
    '产品': ['食品', '饮料', '食品', '饮料', '食品', '饮料'],
    '销售额': [12000, 8000, 15000, 9000, 10000, 7500]
})

print("原始数据:")
print(df)

# 创建透视表
pivot = pd.pivot_table(df, 
                       values='销售额', 
                       index='门店', 
                       columns='月份',
                       aggfunc='sum',
                       fill_value=0)
print("\\n透视表（门店 x 月份）:")
print(pivot)

# 多层聚合
pivot2 = pd.pivot_table(df, 
                         values='销售额',
                         index='门店',
                         columns='月份',
                         aggfunc={'销售额': ['sum', 'mean']})
print("\\n多层聚合:")
print(pivot2)`,
        explanation: [
          { code: "pd.pivot_table(df, values='销售额', index='门店')", description: 'values指定要聚合的列，index指定行索引。' },
          { code: "columns='月份'", description: 'columns参数将月份展开为列，创建交叉表格结构。' },
          { code: "aggfunc='sum'", description: 'aggfunc指定聚合函数，默认为mean，可设为sum、count、max等。' }
        ]
      },
      {
        title: 'crosstab交叉表',
        code: `import pandas as pd

# 创建用户行为数据
df = pd.DataFrame({
    '用户ID': [1, 2, 3, 4, 5, 6, 7, 8],
    '地区': ['北京', '北京', '上海', '上海', '北京', '广州', '广州', '上海'],
    '行为': ['浏览', '购买', '浏览', '购买', '购买', '浏览', '浏览', '购买'],
    '商品类别': ['服装', '服装', '电器', '电器', '电器', '服装', '食品', '食品']
})

print("用户行为数据:")
print(df)

# 交叉表：地区 vs 行为
ct1 = pd.crosstab(df['地区'], df['行为'])
print("\\n交叉表（地区 vs 行为）:")
print(ct1)

# 带聚合的交叉表
ct2 = pd.crosstab(df['地区'], df['行为'], values=df['用户ID'], aggfunc='count')
print("\\n带计数的交叉表:")
print(ct2)

# 多级索引交叉表
ct3 = pd.crosstab([df['地区'], df['行为']], df['商品类别'])
print("\\n多级交叉表:")
print(ct3)`,
        explanation: [
          { code: "pd.crosstab(df['地区'], df['行为'])", description: '创建两个分类变量的交叉表，计算频数。' },
          { code: "values=df['用户ID'], aggfunc='count'", description: '对指定值列计算聚合，可以是count、sum、mean等。' },
          { code: "pd.crosstab([地区, 行为], 商品)", description: '列表形式支持多级行索引，创建多维交叉表。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'pivot_table中，哪个参数用于指定要聚合的列？',
        options: ['A. index', 'B. values', 'C. columns', 'D. aggfunc'],
        correct: 1,
        explanation: 'values参数指定要进行聚合计算的列名。'
      },
      {
        id: 'q2',
        text: 'crosstab和pivot_table的主要区别是？',
        options: ['A. crosstab只能用于计数', 'B. crosstab专门用于分类变量的交叉分析', 'C. 没有区别', 'D. pivot_table更快'],
        correct: 1,
        explanation: 'crosstab专门用于计算分类变量的频数交叉表，语法更简洁。pivot_table功能更全面。'
      },
      {
        id: 'q3',
        text: '透视表中，margins=True的作用是什么？',
        options: ['A. 填充缺失值', 'B. 添加汇总行和列', 'C. 排序数据', 'D. 删除重复'],
        correct: 1,
        explanation: 'margins=True会在透视表底部和右侧添加汇总行和汇总列。'
      },
      {
        id: 'q4',
        text: 'pivot_table的哪个参数用于指定列索引，会将值展开为列？',
        options: ['A. index', 'B. values', 'C. columns', 'D. aggfunc'],
        correct: 2,
        explanation: 'columns参数将指定的列值展开为多个列，创建交叉表格结构，方便对比不同类别的数据。index参数指定行索引。'
      },
      {
        id: 'q5',
        text: 'crosstab专门用于计算什么类型的表？',
        options: ['A. 数据摘要表', 'B. 两个或多个分类变量的频数表', 'C. 时间序列表', 'D. 相关性分析表'],
        correct: 1,
        explanation: 'crosstab计算分类变量组合出现的次数，返回频数表（交叉表），适合快速查看变量间的分布关系。'
      }
    ]
  },
  {
    id: 'topic10',
    title: '缺失值高级处理（interpolate/fillna策略）',
    objectives: ['掌握多种填充策略', '学会使用interpolate插值', '理解前向/后向填充的应用场景'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握多种填充策略</li>
          <li>学会使用interpolate插值</li>
          <li>理解前向/后向填充的应用场景</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>某传感器系统采集环境数据，由于设备故障导致部分时间点的数据缺失。缺失的数据需要合理填充才能进行后续分析：可以用前后的值填充、时间加权填充、或者根据业务规则填充。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>fillna填充策略</h3>
        <p>fillna()支持多种填充方式：固定值填充、前向填充（ffill，使用前一个有效值）、后向填充（bfill，使用后一个有效值）、均值/中位数填充、字典/Series映射填充。</p>
        
        <h3>interpolate插值</h3>
        <p>interpolate()是更智能的填充方法，支持线性插值（默认）、时间插值、多项式插值、样条插值等。对于时间序列数据，时间插值（method='time'）非常有效。</p>
        
        <h3>填充策略选择</h3>
        <p>选择填充方法需要根据数据特性决定：随机缺失可用均值填充、连续缺失用插值更合理、时间序列数据优先考虑时序插值、分类数据用众数或固定值填充。</p>
      </div>
    `,
    codeExamples: [
      {
        title: '多种填充方法对比',
        code: `import pandas as pd
import numpy as np

# 创建包含缺失值的时间序列
dates = pd.date_range('2024-01-01', periods=10, freq='D')
df = pd.DataFrame({
    '日期': dates,
    '温度': [20, 21, np.nan, 23, np.nan, 26, 27, np.nan, 29, 30]
})
df.set_index('日期', inplace=True)

print("原始数据（带缺失值）:")
print(df)

# 前向填充（用前一个值填充）
df['ffill'] = df['温度'].fillna(method='ffill')
print("\\n前向填充后:")
print(df)

# 后向填充（用后一个值填充）
df['bfill'] = df['温度'].fillna(method='bfill')
print("\\n后向填充后:")
print(df)

# 均值填充
mean_val = df['温度'].mean()
df['mean_fill'] = df['温度'].fillna(mean_val)
print(f"\\n均值填充（均值={mean_val:.2f}）:")
print(df)`,
        explanation: [
          { code: "df['温度'].fillna(method='ffill')", description: '前向填充(forward fill)，用前一个有效值填充当前缺失值。' },
          { code: "df['温度'].fillna(method='bfill')", description: '后向填充(backward fill)，用后一个有效值填充当前缺失值。' },
          { code: "df['温度'].mean()", description: '计算均值用于填充。均值填充适合数据分布相对均匀的情况。' }
        ]
      },
      {
        title: 'interpolate插值方法',
        code: `import pandas as pd
import numpy as np

dates = pd.date_range('2024-01-01', periods=10, freq='D')
df = pd.DataFrame({
    '日期': dates,
    '温度': [20, 21, np.nan, 23, np.nan, 26, 27, np.nan, 29, 30]
})
df.set_index('日期', inplace=True)

# 线性插值
df['linear'] = df['温度'].interpolate(method='linear')
print("线性插值:")
print(df[['温度', 'linear']])

# 时间插值（考虑时间间隔）
df['time'] = df['温度'].interpolate(method='time')
print("\\n时间插值:")
print(df[['温度', 'time']])

# 多项式插值（适合曲线数据）
df['polynomial'] = df['温度'].interpolate(method='polynomial', order=2)
print("\\n多项式插值:")
print(df[['温度', 'polynomial']])`,
        explanation: [
          { code: "df['温度'].interpolate(method='linear')", description: '线性插值在缺失值之间创建线性过渡。' },
          { code: "method='time'", description: '时间插值考虑时间间隔，适合时间序列数据。' },
          { code: "method='polynomial', order=2", description: '多项式插值用曲线拟合数据，order指定多项式阶数。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: '前向填充（ffill）使用什么值填充缺失值？',
        options: ['A. 后一个有效值', 'B. 前一个有效值', 'C. 均值', 'D. 中位数'],
        correct: 1,
        explanation: '前向填充用缺失值前面的最近一个有效值填充。'
      },
      {
        id: 'q2',
        text: 'interpolate的默认插值方法是？',
        options: ['A. 时间插值', 'B. 多项式插值', 'C. 线性插值', 'D. 样条插值'],
        correct: 2,
        explanation: 'interpolate默认使用线性插值，在相邻有效值之间创建直线过渡。'
      },
      {
        id: 'q3',
        text: '哪种插值方法最适合处理时间序列数据？',
        options: ['A. linear', 'B. time', 'C. polynomial', 'D. spline'],
        correct: 1,
        explanation: 'time方法考虑了时间点之间的时间间隔，对于时间序列数据最为准确。'
      },
      {
        id: 'q4',
        text: '前向填充（ffill）使用什么值来填充缺失值？',
        options: ['A. 缺失值后面的最近一个有效值', 'B. 缺失值前面的最近一个有效值', 'C. 整列的平均值', 'D. 整列的中位数'],
        correct: 1,
        explanation: '前向填充(forward fill)用缺失值前面的最近一个有效值填充当前缺失值，适用于数据连续变化的场景。'
      },
      {
        id: 'q5',
        text: 'interpolate的线性插值在相邻有效值之间创建什么类型的过渡？',
        options: ['A. 直线过渡', 'B. 曲线过渡', 'C. 阶梯过渡', 'D. 随机过渡'],
        correct: 0,
        explanation: '线性插值默认在相邻两个有效值之间创建直线路径，适用于数据变化相对平稳的情况。'
      }
    ]
  },
  {
    id: 'topic11',
    title: '性能优化（矢量化、apply优化、数据类型优化）',
    objectives: ['掌握矢量化操作替代循环', '学会使用apply和向量化函数', '理解数据类型对性能的影响'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握矢量化操作替代循环</li>
          <li>学会使用apply和向量化函数</li>
          <li>理解数据类型对性能的影响</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>你正在处理一个包含100万行的销售数据集，处理脚本运行了10分钟还未完成。作为专业数据分析师，需要通过优化技术将处理时间降低到几秒钟以内，提高工作效率。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>矢量化优于循环</h3>
        <p>Pandas设计为向量化操作优化，广播机制使其能高效处理数组。循环操作DataFrame的每一行非常慢，应该用向量化操作替代。例如：用df['A'] * df['B']替代逐行相乘。</p>
        
        <h3>apply优化</h3>
        <p>apply()比循环快，但对于简单操作仍不如向量化。优化建议：避免在apply中使用复杂Python函数、使用Cython或Numba加速、必要时考虑groupby().apply()并行化。</p>
        
        <h3>数据类型优化</h3>
        <p>使用适当的数据类型可大幅降低内存占用：用category替代object类型存储分类数据、用int8/int16/int32替代int64、用float32替代float64。定期检查内存使用：df.info(memory_usage='deep')。</p>
      </div>
    `,
    codeExamples: [
      {
        title: '矢量化操作替代循环',
        code: `import pandas as pd
import numpy as np
import time

# 创建大数据集
np.random.seed(42)
n = 100000
df = pd.DataFrame({
    'A': np.random.randint(1, 100, n),
    'B': np.random.randint(1, 100, n),
    'C': np.random.choice(['高', '中', '低'], n)
})

# 方法1：循环（慢）
start = time.time()
result1 = []
for i in range(len(df)):
    result1.append(df['A'].iloc[i] * df['B'].iloc[i])
time1 = time.time() - start

# 方法2：apply（中等）
start = time.time()
result2 = df.apply(lambda row: row['A'] * row['B'], axis=1)
time2 = time.time() - start

# 方法3：向量化（最快）
start = time.time()
result3 = df['A'] * df['B']
time3 = time.time() - start

print(f"循环耗时: {time1:.4f}s")
print(f"apply耗时: {time2:.4f}s")
print(f"向量化耗时: {time3:.4f}s")
print(f"\\n向量化比循环快 {time1/time3:.1f} 倍")`,
        explanation: [
          { code: 'for i in range(len(df))', description: '使用Python循环逐行处理是最低效的方法。' },
          { code: 'df.apply(lambda row: row["A"] * row["B"], axis=1)', description: 'apply比循环快，但仍不如向量化。' },
          { code: "df['A'] * df['B']", description: '向量化乘法直接操作整个列，Pandas内部会用优化的C代码执行。' }
        ]
      },
      {
        title: '数据类型优化',
        code: `import pandas as pd
import numpy as np

# 创建包含多种数据类型的数据
df = pd.DataFrame({
    '整数': np.random.randint(0, 100, 10000),
    '小数': np.random.random(10000),
    '类别': np.random.choice(['A', 'B', 'C', 'D', 'E'], 10000),
    '标签': np.random.choice([True, False], 10000)
})

print("优化前内存使用:")
print(df.info(memory_usage='deep'))

# 优化数据类型
df['整数'] = df['整数'].astype('int8')  # int8范围-128到127
df['小数'] = df['小数'].astype('float32')  # float32比float64省一半内存
df['类别'] = df['类别'].astype('category')  # 分类数据用category类型
df['标签'] = df['标签'].astype('int8')  # 用0/1代替布尔值

print("\\n优化后内存使用:")
print(df.info(memory_usage='deep'))

# 显示优化效果
print(f"\\n内存优化效果:")
print(f"整数列：int64 → int8，节省 {df['整数'].memory_usage(deep=True) * 8}x 空间")`,
        explanation: [
          { code: "df['整数'].astype('int8')", description: 'int8只占1字节，int64占8字节，节省87.5%空间。' },
          { code: "df['类别'].astype('category')", description: 'category类型用整数编码存储字符串，适合类别数量远少于行数的情况。' },
          { code: "df.info(memory_usage='deep')", description: 'deep=True计算实际内存占用，包括对象引用等。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: '在Pandas中，哪种操作方式性能最好？',
        options: ['A. Python循环', 'B. apply()', 'C. 向量化操作', 'D. iterrows()'],
        correct: 2,
        explanation: '向量化操作直接作用于整个数组，Pandas内部使用优化的C代码执行，性能远优于Python循环。'
      },
      {
        id: 'q2',
        text: 'int8和int64的主要区别是？',
        options: ['A. 精度不同', 'B. 内存占用和数值范围', 'C. 速度不同', 'D. 没有区别'],
        correct: 1,
        explanation: 'int8占1字节（8位），int64占8字节。int8数值范围-128到127，适合存储小范围整数。'
      },
      {
        id: 'q3',
        text: '哪种数据类型适合存储大量重复的分类字符串？',
        options: ['A. object', 'B. string', 'C. category', 'D. char'],
        correct: 2,
        explanation: 'category类型用整数编码存储字符串，适合类别数远少于行数的情况，可大幅节省内存。'
      },
      {
        id: 'q4',
        text: '向量化操作在Pandas内部使用什么代码执行？',
        options: ['A. Python代码', 'B. JavaScript代码', 'C. C代码', 'D. Java代码'],
        correct: 2,
        explanation: '向量化操作避免了Python循环，内部使用编译好的C代码执行，大大提高计算效率。'
      },
      {
        id: 'q5',
        text: '使用astype()将int64转换为int8可以节省约多少内存空间？',
        options: ['A. 50%', 'B. 75%', 'C. 87.5%', 'D. 100%'],
        correct: 2,
        explanation: 'int64占8字节，int8占1字节，所以可以节省(8-1)/8 = 87.5%的内存空间。'
      }
    ]
  },
  {
    id: 'topic12',
    title: '实战综合案例（完整数据分析流程）',
    objectives: ['掌握完整的数据分析流程', '综合运用前面学习的各项技能', '能够独立完成实际数据分析项目'],
    contentHtml: `
      <div>
        <h2>🎯 学习目标</h2>
        <ul>
          <li>掌握完整的数据分析流程</li>
          <li>综合运用前面学习的各项技能</li>
          <li>能够独立完成实际数据分析项目</li>
        </ul>
        
        <h2>💼 业务场景</h2>
        <p>某电商公司提供了一份包含10万条交易记录的CSV文件，需要你完成一份完整的销售数据分析报告。包括：数据清洗、分月/分类统计、销售趋势分析、异常检测、可视化展示、关键发现和建议。</p>
        
        <h2>📚 详细讲解</h2>
        <h3>数据分析流程</h3>
        <p>标准的数据分析流程包括：1）明确分析目标；2）数据加载与探索；3）数据清洗（缺失值、异常值、重复值）；4）数据分析与建模；5）结果可视化；6）撰写报告。</p>
        
        <h3>综合技能应用</h3>
        <p>本案例将综合运用：read_csv读取数据、info()/describe()探索数据、dropna()/fillna()处理缺失值、groupby()/agg()聚合分析、pivot_table创建透视表、plot()可视化、datetime处理时间序列、resample()时间聚合。</p>
        
        <h3>分析报告结构</h3>
        <p>一份完整的分析报告应包括：执行摘要（关键发现）、数据概况、分析方法、各维度分析结果、可视化图表、结论与建议。</p>
      </div>
    `,
    codeExamples: [
      {
        title: '完整数据分析流程',
        code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 1. 数据加载
print("="*50)
print("第一步：数据加载与探索")
print("="*50)
df = pd.DataFrame({
    '订单ID': range(1, 1001),
    '日期': pd.date_range('2024-01-01', periods=1000, freq='H'),
    '产品': np.random.choice(['手机', '电脑', '耳机', '平板'], 1000),
    '地区': np.random.choice(['北京', '上海', '广州', '深圳'], 1000),
    '销售额': np.random.randint(100, 5000, 1000),
    '数量': np.random.randint(1, 10, 1000)
})

# 添加缺失值和异常值模拟真实场景
df.loc[10, '销售额'] = np.nan
df.loc[50, '销售额'] = -100  # 异常值

print(f"数据形状: {df.shape}")
print(f"\\n数据预览:")
print(df.head())

# 2. 数据清洗
print("\\n" + "="*50)
print("第二步：数据清洗")
print("="*50)
print(f"缺失值统计:\\n{df.isnull().sum()}")
df['销售额'].fillna(df['销售额'].median(), inplace=True)
print(f"\\n删除异常值前: {len(df)} 行")
df = df[df['销售额'] > 0]
print(f"删除异常值后: {len(df)} 行")`,
        explanation: [
          { code: 'df.shape', description: '查看数据维度，返回(行数, 列数)。' },
          { code: 'df.isnull().sum()', description: '统计每列的缺失值数量。' },
          { code: "df = df[df['销售额'] > 0]", description: '删除异常值，保留销售额大于0的记录。' }
        ]
      },
      {
        title: '分析与可视化',
        code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 准备数据（简化版）
df = pd.DataFrame({
    '日期': pd.date_range('2024-01-01', periods=100, freq='D'),
    '产品': np.random.choice(['手机', '电脑', '耳机'], 100),
    '地区': np.random.choice(['北京', '上海'], 100),
    '销售额': np.random.randint(100, 2000, 100)
})

# 设置日期索引
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)

# 3. 数据分析
print("\\n" + "="*50)
print("第三步：数据分析")
print("="*50)

# 按月汇总
monthly = df['销售额'].resample('M').sum()
print("\\n月度销售额:")
print(monthly)

# 按产品分析
product_stats = df.groupby('产品')['销售额'].agg(['sum', 'mean', 'count'])
print("\\n产品销售统计:")
print(product_stats)

# 透视表分析
pivot = pd.pivot_table(df.reset_index(), 
                       values='销售额', 
                       index='产品', 
                       columns='地区',
                       aggfunc='sum',
                       fill_value=0)
print("\\n产品-地区交叉分析:")
print(pivot)

# 4. 可视化
print("\\n" + "="*50)
print("第四步：数据可视化")
print("="*50)
print("生成以下图表：")
print("- 月度销售趋势图")
print("- 产品销售占比饼图")
print("- 地区销售额柱状图")

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 趋势图
monthly.plot(ax=axes[0, 0], kind='line', marker='o', title='月度销售趋势')

# 产品占比
product_stats['sum'].plot(ax=axes[0, 1], kind='pie', autopct='%1.1f%%', title='产品销售占比')

# 地区柱状图
df.groupby('地区')['销售额'].sum().plot(ax=axes[1, 0], kind='bar', title='地区销售额对比')

# 产品趋势
df.groupby([pd.Grouper(freq='M'), '产品'])['销售额'].sum().unstack().plot(ax=axes[1, 1], kind='line', title='各产品月度趋势')

plt.tight_layout()
plt.savefig('sales_analysis.png')
plt.show()

print("\\n分析完成！")`,
        explanation: [
          { code: "df['销售额'].resample('M').sum()", description: '按月重采样，计算每月销售额总和。' },
          { code: "df.groupby('产品')['销售额'].agg(['sum', 'mean', 'count'])", description: 'groupby后agg同时计算多个统计量。' },
          { code: "pd.pivot_table(df.reset_index(), values='销售额', index='产品', columns='地区')", description: '创建产品-地区的交叉透视表。' }
        ]
      }
    ],
    questions: [
      {
        id: 'q1',
        text: '数据分析的标准流程第一步是什么？',
        options: ['A. 数据清洗', 'B. 明确分析目标', 'C. 数据可视化', 'D. 建模预测'],
        correct: 1,
        explanation: '数据分析的第一步是明确分析目标，这决定了后续的数据处理和分析方法选择。'
      },
      {
        id: 'q2',
        text: '处理缺失值时，均值填充适用于什么情况？',
        options: ['A. 所有情况', 'B. 数据分布均匀，无极端值', 'C. 时间序列数据', 'D. 分类数据'],
        correct: 1,
        explanation: '均值填充适合数据分布相对均匀、没有明显极端值的情况，否则建议使用中位数。'
      },
      {
        id: 'q3',
        text: '一份完整的数据分析报告应包含哪些部分？',
        options: ['A. 只有图表', 'B. 只有数据', 'C. 执行摘要、分析方法、结果、结论', 'D. 只有结论'],
        correct: 2,
        explanation: '完整报告包括：执行摘要（关键发现）、分析方法、各维度分析结果、可视化图表、结论与建议。'
      },
      {
        id: 'q4',
        text: '数据分析流程的第一步是什么？',
        options: ['A. 数据收集', 'B. 明确分析目标', 'C. 数据清洗', 'D. 数据可视化'],
        correct: 1,
        explanation: '明确分析目标是数据分析的第一步，决定了后续的数据收集、处理和分析方法的选择。'
      },
      {
        id: 'q5',
        text: '数据清洗的主要工作包括处理什么？',
        options: ['A. 缺失值、异常值和重复值', 'B. 数据类型转换', 'C. 数据排序', 'D. 数据归一化'],
        correct: 0,
        explanation: '数据清洗三大任务：缺失值处理（删除或填充）、异常值处理（识别和修正）、重复值处理（删除）。'
      }
    ]
  }
];
