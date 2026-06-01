// 题库数据
export const questionBank = [
  {
    id: 'quiz1',
    topicId: 'topic1',
    topicTitle: 'Pandas入门',
    questions: [
      {
        id: 'q1',
        question: 'Pandas中用于创建一维带标签数组的结构是？',
        options: ['DataFrame', 'Series', 'Array', 'List'],
        correct: 1,
        explanation: 'Series是Pandas的一维数据结构，每个元素都有对应的索引标签。DataFrame是二维结构。'
      },
      {
        id: 'q2',
        question: 'DataFrame的每一列是什么类型？',
        options: ['List', 'Array', 'Series', 'Dictionary'],
        correct: 2,
        explanation: 'DataFrame的每一列都是一个Series，它们共享同一个行索引。这是Pandas的核心设计之一。'
      },
      {
        id: 'q3',
        question: '创建Series时，index参数用于指定什么？',
        options: ['数据值', '索引标签', '列名', '数据类型'],
        correct: 1,
        explanation: 'index参数用于指定Series的索引标签，这样可以通过标签而不是位置来访问数据。'
      },
      {
        id: 'q4',
        question: '从字典创建DataFrame时，字典的键会成为什么？',
        options: ['行索引', '列名', '数据值', '索引标签'],
        correct: 1,
        explanation: '从字典创建DataFrame时，字典的键会成为DataFrame的列名，字典的值会成为对应列的数据。'
      }
    ]
  },
  {
    id: 'quiz2',
    topicId: 'topic2',
    topicTitle: '数据读取与写入',
    questions: [
      {
        id: 'q1',
        question: '读取CSV文件应该使用哪个函数？',
        options: ['read_excel()', 'read_csv()', 'read_file()', 'load_csv()'],
        correct: 1,
        explanation: 'pd.read_csv()是Pandas专门用于读取CSV文件的函数。read_excel()用于读取Excel文件。'
      },
      {
        id: 'q2',
        question: '保存文件时设置index=False的目的是？',
        options: ['提高保存速度', '不保存索引列', '压缩文件大小', '加密文件'],
        correct: 1,
        explanation: 'index=False参数表示不将DataFrame的索引列保存到文件中，这样文件看起来更干净。'
      },
      {
        id: 'q3',
        question: '读取Excel文件时，sheet_name参数用于指定什么？',
        options: ['文件路径', '工作表名', '列名', '编码格式'],
        correct: 1,
        explanation: 'sheet_name参数用于指定要读取的工作表，可以是工作表名（字符串）或索引（数字）。'
      },
      {
        id: 'q4',
        question: '处理中文文件时，推荐使用哪种编码？',
        options: ['ascii', 'utf-8', 'gbk', 'latin-1'],
        correct: 1,
        explanation: '处理中文文件时推荐使用utf-8编码，或者utf-8-sig（带BOM的UTF-8）以兼容Windows。'
      }
    ]
  },
  {
    id: 'quiz3',
    topicId: 'topic3',
    topicTitle: '数据预览与筛选',
    questions: [
      {
        id: 'q1',
        question: '查看数据前3行应该使用哪个方法？',
        options: ['head(3)', 'tail(3)', 'first(3)', 'top(3)'],
        correct: 0,
        explanation: 'df.head(n)用于显示数据的前n行，默认n=5。tail(n)显示后n行。'
      },
      {
        id: 'q2',
        question: '按整数位置索引访问数据应该使用？',
        options: ['loc', 'iloc', 'ix', 'index'],
        correct: 1,
        explanation: 'iloc是基于整数位置的索引器，用于按行号和列号访问数据。loc是基于标签的索引器。'
      },
      {
        id: 'q3',
        question: '筛选某列值在指定列表中的数据应该使用？',
        options: ['==', 'isin()', 'contains()', '>'],
        correct: 1,
        explanation: 'isin()方法用于判断列值是否在指定列表中，非常适合处理多选条件。'
      },
      {
        id: 'q4',
        question: '查看数据的统计信息应该使用哪个方法？',
        options: ['info()', 'describe()', 'head()', 'shape'],
        correct: 1,
        explanation: 'describe()方法显示数值列的统计信息，包括计数、均值、标准差、最小值、分位数、最大值等。'
      }
    ]
  }
]
