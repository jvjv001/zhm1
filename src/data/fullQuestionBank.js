// 完整题库数据 - 12个知识点，每个知识点5道题
export const fullQuestionBank = [
  {
    id: 'quiz1',
    topicId: 'topic1',
    topicTitle: 'Pandas入门',
    questions: [
      {
        id: 't1-q1',
        question: 'Pandas中用于创建一维带标签数组的结构是？',
        options: ['DataFrame', 'Series', 'Array', 'List'],
        correct: 1,
        explanation: 'Series是Pandas的一维数据结构，每个元素都有对应的索引标签。DataFrame是二维结构。'
      },
      {
        id: 't1-q2',
        question: 'DataFrame的每一列是什么类型？',
        options: ['List', 'Array', 'Series', 'Dictionary'],
        correct: 2,
        explanation: 'DataFrame的每一列都是一个Series，它们共享同一个行索引。这是Pandas的核心设计之一。'
      },
      {
        id: 't1-q3',
        question: '创建Series时，index参数用于指定什么？',
        options: ['数据值', '索引标签', '列名', '数据类型'],
        correct: 1,
        explanation: 'index参数用于指定Series的索引标签，这样可以通过标签而不是位置来访问数据。'
      },
      {
        id: 't1-q4',
        question: '从字典创建DataFrame时，字典的键会成为什么？',
        options: ['行索引', '列名', '数据值', '索引标签'],
        correct: 1,
        explanation: '从字典创建DataFrame时，字典的键会成为DataFrame的列名，字典的值会成为对应列的数据。'
      },
      {
        id: 't1-q5',
        question: 'Pandas和Numpy的主要区别是？',
        options: ['Pandas更快', 'Pandas有标签索引', 'Numpy支持更多数据类型', '没有区别'],
        correct: 1,
        explanation: 'Pandas的核心优势是提供了标签索引，可以更灵活地通过标签而非位置访问数据。'
      }
    ]
  },
  {
    id: 'quiz2',
    topicId: 'topic2',
    topicTitle: '数据读取与写入',
    questions: [
      {
        id: 't2-q1',
        question: '读取CSV文件应该使用哪个函数？',
        options: ['read_excel()', 'read_csv()', 'read_file()', 'load_csv()'],
        correct: 1,
        explanation: 'pd.read_csv()是Pandas专门用于读取CSV文件的函数。read_excel()用于读取Excel文件。'
      },
      {
        id: 't2-q2',
        question: '保存文件时设置index=False的目的是？',
        options: ['提高保存速度', '不保存索引列', '压缩文件大小', '加密文件'],
        correct: 1,
        explanation: 'index=False参数表示不将DataFrame的索引列保存到文件中，这样文件看起来更干净。'
      },
      {
        id: 't2-q3',
        question: '读取Excel文件时，sheet_name参数用于指定什么？',
        options: ['文件路径', '工作表名', '列名', '编码格式'],
        correct: 1,
        explanation: 'sheet_name参数用于指定要读取的工作表，可以是工作表名（字符串）或索引（数字）。'
      },
      {
        id: 't2-q4',
        question: '处理中文文件时，推荐使用哪种编码？',
        options: ['ascii', 'utf-8', 'gbk', 'latin-1'],
        correct: 1,
        explanation: '处理中文文件时推荐使用utf-8编码，或者utf-8-sig（带BOM的UTF-8）以兼容Windows。'
      },
      {
        id: 't2-q5',
        question: '哪个参数可以跳过文件的前n行？',
        options: ['skiprows', 'header', 'index_col', 'usecols'],
        correct: 0,
        explanation: 'skiprows参数用于跳过文件的前n行，常用于处理有注释或说明的文件。'
      }
    ]
  },
  {
    id: 'quiz3',
    topicId: 'topic3',
    topicTitle: '数据预览与筛选',
    questions: [
      {
        id: 't3-q1',
        question: '查看数据前3行应该使用哪个方法？',
        options: ['head(3)', 'tail(3)', 'first(3)', 'top(3)'],
        correct: 0,
        explanation: 'df.head(n)用于显示数据的前n行，默认n=5。tail(n)显示后n行。'
      },
      {
        id: 't3-q2',
        question: '按整数位置索引访问数据应该使用？',
        options: ['loc', 'iloc', 'ix', 'index'],
        correct: 1,
        explanation: 'iloc是基于整数位置的索引器，用于按行号和列号访问数据。loc是基于标签的索引器。'
      },
      {
        id: 't3-q3',
        question: '筛选某列值在指定列表中的数据应该使用？',
        options: ['==', 'isin()', 'contains()', '>'],
        correct: 1,
        explanation: 'isin()方法用于判断列值是否在指定列表中，非常适合处理多选条件。'
      },
      {
        id: 't3-q4',
        question: '查看数据的统计信息应该使用哪个方法？',
        options: ['info()', 'describe()', 'head()', 'shape'],
        correct: 1,
        explanation: 'describe()方法显示数值列的统计信息，包括计数、均值、标准差、最小值、分位数、最大值等。'
      },
      {
        id: 't3-q5',
        question: '获取数据的行数和列数应该使用？',
        options: ['size', 'shape', 'info()', 'count()'],
        correct: 1,
        explanation: 'shape属性返回一个元组(行数, 列数)，是查看数据规模最常用的方式。'
      }
    ]
  },
  {
    id: 'quiz4',
    topicId: 'topic4',
    topicTitle: '数据清洗与处理',
    questions: [
      {
        id: 't4-q1',
        question: '删除包含缺失值的行应该使用？',
        options: ['dropna()', 'drop()', 'fillna()', 'remove()'],
        correct: 0,
        explanation: 'dropna()方法用于删除包含缺失值的行或列，可以通过参数控制删除的条件。'
      },
      {
        id: 't4-q2',
        question: '用指定值填充缺失值应该使用？',
        options: ['dropna()', 'fillna()', 'replace()', 'set()'],
        correct: 1,
        explanation: 'fillna()方法用于填充缺失值，可以指定常量值，也可以使用前向填充、后向填充等策略。'
      },
      {
        id: 't4-q3',
        question: '删除重复的行应该使用？',
        options: ['drop_duplicates()', 'unique()', 'drop()', 'distinct()'],
        correct: 0,
        explanation: 'drop_duplicates()方法用于删除重复的行，可以保留第一次出现或最后一次出现的记录。'
      },
      {
        id: 't4-q4',
        question: '替换数据中的值应该使用？',
        options: ['replace()', 'fillna()', 'map()', 'swap()'],
        correct: 0,
        explanation: 'replace()方法可以替换数据中的指定值，支持一对一、多对一、字典映射等多种替换方式。'
      },
      {
        id: 't4-q5',
        question: '检测缺失值应该使用？',
        options: ['isna()或isnull()', 'notna()', 'missing()', 'check()'],
        correct: 0,
        explanation: 'isna()和isnull()功能相同，用于检测值是否为缺失值，返回布尔值。'
      }
    ]
  },
  {
    id: 'quiz5',
    topicId: 'topic5',
    topicTitle: '数据变换与重塑',
    questions: [
      {
        id: 't5-q1',
        question: '对列进行重命名应该使用？',
        options: ['rename()', 'rename_axis()', 'columns', 'name'],
        correct: 0,
        explanation: 'rename()方法可以重命名索引或列，接受字典形式的映射关系。'
      },
      {
        id: 't5-q2',
        question: '将长格式数据转换为宽格式应该使用？',
        options: ['pivot()', 'melt()', 'stack()', 'unstack()'],
        correct: 0,
        explanation: 'pivot()方法将长格式数据转换为宽格式，melt()则相反。'
      },
      {
        id: 't5-q3',
        question: '对数据进行排序应该使用？',
        options: ['sort_values()', 'sort_index()', 'order()', 'arrange()'],
        correct: 0,
        explanation: 'sort_values()按值排序，sort_index()按索引排序。'
      },
      {
        id: 't5-q4',
        question: '重置索引应该使用？',
        options: ['reset_index()', 'set_index()', 'reindex()', 'index()'],
        correct: 0,
        explanation: 'reset_index()将索引重置为默认的整数序列，原索引变为一列。'
      },
      {
        id: 't5-q5',
        question: '将列设置为索引应该使用？',
        options: ['set_index()', 'reset_index()', 'index()', 'reindex()'],
        correct: 0,
        explanation: 'set_index()将指定的列设置为行索引。'
      }
    ]
  },
  {
    id: 'quiz6',
    topicId: 'topic6',
    topicTitle: '数据聚合与分组',
    questions: [
      {
        id: 't6-q1',
        question: '按列进行分组应该使用？',
        options: ['groupby()', 'aggregate()', 'split()', 'cluster()'],
        correct: 0,
        explanation: 'groupby()是Pandas中最强大的功能之一，用于按一个或多个键分组数据。'
      },
      {
        id: 't6-q2',
        question: '对分组后的数据应用聚合函数应该使用？',
        options: ['agg()或aggregate()', 'apply()', 'transform()', 'sum()'],
        correct: 0,
        explanation: 'agg()或aggregate()方法可以应用一个或多个聚合函数到分组后的数据上。'
      },
      {
        id: 't6-q3',
        question: '以下哪个不是聚合函数？',
        options: ['mean()', 'sum()', 'count()', 'filter()'],
        correct: 3,
        explanation: 'filter()用于过滤分组，不是聚合函数。聚合函数将多个值汇总为一个值。'
      },
      {
        id: 't6-q4',
        question: '透视表的创建应该使用？',
        options: ['pivot_table()', 'pivot()', 'table()', 'crosstab()'],
        correct: 0,
        explanation: 'pivot_table()用于创建透视表，可以指定聚合方式。'
      },
      {
        id: 't6-q5',
        question: '交叉表的创建应该使用？',
        options: ['crosstab()', 'pivot_table()', 'table()', 'pivot()'],
        correct: 0,
        explanation: 'pd.crosstab()专门用于创建交叉表，统计两个或多个因素的交叉频率。'
      }
    ]
  },
  {
    id: 'quiz7',
    topicId: 'topic7',
    topicTitle: '数据合并与连接',
    questions: [
      {
        id: 't7-q1',
        question: '按列合并两个DataFrame应该使用？',
        options: ['merge()', 'concat()', 'join()', 'append()'],
        correct: 0,
        explanation: 'merge()类似SQL的JOIN，按列的值进行合并。'
      },
      {
        id: 't7-q2',
        question: '按行或列拼接DataFrame应该使用？',
        options: ['concat()', 'merge()', 'join()', 'append()'],
        correct: 0,
        explanation: 'concat()是最通用的拼接方法，可以指定按行或按列拼接。'
      },
      {
        id: 't7-q3',
        question: '内连接(inner join)会保留什么？',
        options: ['只保留两个表都有的键', '保留左边表所有键', '保留右边表所有键', '保留所有键'],
        correct: 0,
        explanation: '内连接只保留两个表中都有的键组合的行。'
      },
      {
        id: 't7-q4',
        question: 'append()方法的作用是？',
        options: ['在末尾添加行', '在末尾添加列', '合并表', '删除行'],
        correct: 0,
        explanation: 'append()方法在DataFrame末尾添加行，不过新版本推荐使用concat()。'
      },
      {
        id: 't7-q5',
        question: 'merge()的on参数指定什么？',
        options: ['连接的列名', '连接类型', '连接方向', '连接条件'],
        correct: 0,
        explanation: 'on参数指定两个表用于连接的列名。'
      }
    ]
  },
  {
    id: 'quiz8',
    topicId: 'topic8',
    topicTitle: '时间序列处理',
    questions: [
      {
        id: 't8-q1',
        question: '将字符串转换为日期应该使用？',
        options: ['to_datetime()', 'date()', 'datetime()', 'parse()'],
        correct: 0,
        explanation: 'pd.to_datetime()是Pandas中将各种日期表示转换为datetime类型的标准方法。'
      },
      {
        id: 't8-q2',
        question: '创建日期范围应该使用？',
        options: ['date_range()', 'daterange()', 'range()', 'dates()'],
        correct: 0,
        explanation: 'pd.date_range()用于创建一个连续的日期序列。'
      },
      {
        id: 't8-q3',
        question: '按日期重采样应该使用？',
        options: ['resample()', 'sample()', 'groupby()', 'date()'],
        correct: 0,
        explanation: 'resample()是时间序列特有的分组方法，用于按不同频率聚合数据。'
      },
      {
        id: 't8-q4',
        question: 'dt.year用于获取？',
        options: ['年份', '月份', '日期', '小时'],
        correct: 0,
        explanation: 'dt访问器用于获取datetime列的年、月、日、小时、分钟等时间属性。'
      },
      {
        id: 't8-q5',
        question: '计算相邻元素的差异应该使用？',
        options: ['diff()', 'shift()', 'delta()', 'difference()'],
        correct: 0,
        explanation: 'diff()计算相邻元素的差异，常用于计算增长量。'
      }
    ]
  },
  {
    id: 'quiz9',
    topicId: 'topic9',
    topicTitle: '可视化基础',
    questions: [
      {
        id: 't9-q1',
        question: 'Pandas中快速绘制折线图应该使用？',
        options: ['plot.line()', 'plot.bar()', 'plot.pie()', 'plot.scatter()'],
        correct: 0,
        explanation: 'plot.line()或直接plot()默认绘制折线图，适合展示趋势。'
      },
      {
        id: 't9-q2',
        question: '绘制柱状图应该使用？',
        options: ['plot.bar()', 'plot.line()', 'plot.hist()', 'plot.box()'],
        correct: 0,
        explanation: 'plot.bar()绘制垂直柱状图，plot.barh()绘制水平柱状图。'
      },
      {
        id: 't9-q3',
        question: '绘制散点图需要指定什么参数？',
        options: ['x和y', 'kind', 'title', 'legend'],
        correct: 0,
        explanation: '散点图需要指定x轴和y轴分别使用哪两列数据。'
      },
      {
        id: 't9-q4',
        question: '直方图用于展示什么？',
        options: ['数据的分布情况', '数据的趋势', '数据的对比', '数据的关系'],
        correct: 0,
        explanation: '直方图展示数值变量的频率分布情况，是探索性分析的常用工具。'
      },
      {
        id: 't9-q5',
        question: '箱线图不能展示什么信息？',
        options: ['中位数', '四分位数', '异常值', '具体数值'],
        correct: 3,
        explanation: '箱线图展示数据的分布概况，不显示每个具体数据点。'
      }
    ]
  },
  {
    id: 'quiz10',
    topicId: 'topic10',
    topicTitle: 'Python基础回顾',
    questions: [
      {
        id: 't10-q1',
        question: '定义函数应该使用什么关键字？',
        options: ['function', 'def', 'func', 'define'],
        correct: 1,
        explanation: 'def是Python中定义函数的关键字。'
      },
      {
        id: 't10-q2',
        question: 'Python中的列表用什么括号表示？',
        options: ['[]', '()', '{}', '<>'],
        correct: 0,
        explanation: '列表用方括号[]表示，元组用圆括号()，字典用花括号{}。'
      },
      {
        id: 't10-q3',
        question: '字典的键和值之间用什么分隔？',
        options: ['冒号', '分号', '逗号', '竖线'],
        correct: 0,
        explanation: '字典中键值对的格式为key: value，多个键值对用逗号分隔。'
      },
      {
        id: 't10-q4',
        question: '循环遍历列表应该使用？',
        options: ['for循环', 'while循环', 'do-while循环', 'repeat循环'],
        correct: 0,
        explanation: 'for循环是Python中遍历可迭代对象的主要方式。'
      },
      {
        id: 't10-q5',
        question: '导入模块应该使用？',
        options: ['import', 'include', 'require', 'load'],
        correct: 0,
        explanation: 'import是Python导入模块的关键字。'
      }
    ]
  },
  {
    id: 'quiz11',
    topicId: 'topic11',
    topicTitle: 'NumPy基础',
    questions: [
      {
        id: 't11-q1',
        question: 'NumPy的主要数据结构是？',
        options: ['array', 'list', 'Series', 'DataFrame'],
        correct: 0,
        explanation: 'ndarray是NumPy的核心数据结构，通常称为数组。'
      },
      {
        id: 't11-q2',
        question: '创建数组应该使用？',
        options: ['numpy.array()', 'numpy.list()', 'numpy.matrix()', 'numpy.table()'],
        correct: 0,
        explanation: 'np.array()用于从列表、元组等创建NumPy数组。'
      },
      {
        id: 't11-q3',
        question: '获取数组的形状应该使用？',
        options: ['shape', 'size', 'dim', 'shape()'],
        correct: 0,
        explanation: 'shape属性返回数组的维度元组。'
      },
      {
        id: 't11-q4',
        question: '创建全0数组应该使用？',
        options: ['zeros()', 'ones()', 'empty()', 'full()'],
        correct: 0,
        explanation: 'np.zeros()创建指定形状的全0数组。'
      },
      {
        id: 't11-q5',
        question: '数组运算的特点是？',
        options: ['向量化', '逐元素', '需要循环', '速度慢'],
        correct: 0,
        explanation: 'NumPy的核心优势是向量化运算，无需显式循环，效率很高。'
      }
    ]
  },
  {
    id: 'quiz12',
    topicId: 'topic12',
    topicTitle: '综合实战',
    questions: [
      {
        id: 't12-q1',
        question: '数据分析的一般流程是？',
        options: ['读取-清洗-分析-可视化', '可视化-分析-清洗-读取', '清洗-读取-分析-可视化', '分析-清洗-读取-可视化'],
        correct: 0,
        explanation: '一般流程是读取数据、清洗处理、分析探索、可视化展示。'
      },
      {
        id: 't12-q2',
        question: '处理缺失值的最佳方法是？',
        options: ['视情况而定', '直接删除', '全部填0', '全部填均值'],
        correct: 0,
        explanation: '处理缺失值没有万能方法，需要根据数据特点、缺失原因、业务需求选择合适的方法。'
      },
      {
        id: 't12-q3',
        question: '探索性数据分析(EDA)不包括什么？',
        options: ['构建复杂模型', '查看数据分布', '发现异常值', '理解变量关系'],
        correct: 0,
        explanation: 'EDA主要是理解数据，构建模型是后续步骤。'
      },
      {
        id: 't12-q4',
        question: '好的数据可视化应该？',
        options: ['清晰简洁', '花哨复杂', '颜色越多越好', '元素越多越好'],
        correct: 0,
        explanation: '优秀的可视化应该清晰准确地传达信息，避免无关的装饰。'
      },
      {
        id: 't12-q5',
        question: 'Pandas和Matplotlib的关系是？',
        options: ['Pandas可调用Matplotlib绘图', '竞争关系', '互斥关系', '没有关系'],
        correct: 0,
        explanation: 'Pandas的plot()方法内部调用Matplotlib进行绘图，两者配合得很好。'
      }
    ]
  }
];
