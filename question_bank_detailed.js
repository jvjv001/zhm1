const questionBank = {
    "01 Pandas入门：Series与DataFrame": [
        { 
            id: "p1_1", 
            text: "Pandas中Series对象可以存储什么类型的数据？", 
            options: ["整数", "浮点数", "字符串", "以上都可以"], 
            answer: "以上都可以", 
            explanation: "✅ 正确答案：D（以上都可以）\n\n📖 详细解析：Series是Pandas中最基本的数据结构，它基于NumPy数组构建，因此可以存储多种数据类型。整数类型支持int8到int64多种精度，浮点数支持float16到float64，字符串存储为object类型，此外还支持布尔值、日期时间、复数等类型。同一Series中的所有元素必须是相同的数据类型，这是由NumPy数组的特性决定的，可以通过dtype属性查看具体类型。\n\n❌ 选项分析：\n• 选项A（整数）：错误，整数只是Series支持的类型之一，不全面\n• 选项B（浮点数）：错误，浮点数也只是支持的数据类型之一\n• 选项C（字符串）：错误，字符串同样只是Series可以存储的类型之一\n\n💡 知识点扩展：创建Series时如果传入多种类型的数据，Pandas会自动选择一个能容纳所有类型的通用类型，通常是object类型。这可能导致性能下降，因此建议保持数据类型一致。"
        },
        { 
            id: "p1_2", 
            text: "创建Series的常用方法是？", 
            options: ["pd.Series()", "pd.DataFrame()", "pd.array()", "pd.List()"], 
            answer: "pd.Series()", 
            explanation: "✅ 正确答案：A（pd.Series()）\n\n📖 详细解析：pd.Series()是Pandas专门用于创建一维Series数据结构的函数。基本语法为pd.Series(data, index=index_data)，其中data参数可以是列表、数组、字典或标量值，index参数可选，用于指定索引标签。创建后返回一个带标签的一维数组对象。\n\n❌ 选项分析：\n• 选项B（pd.DataFrame()）：错误，这是创建二维表格DataFrame的函数，不是创建Series\n• 选项C（pd.array()）：错误，array()用于创建NumPy数组，不是Series\n• 选项D（pd.List()）：错误，List不是Pandas的函数，这是Python内置列表类型\n\n💡 知识点扩展：创建Series的几种常用方式：从列表创建pd.Series([1, 2, 3])、从字典创建pd.Series({'a':1, 'b':2})、从NumPy数组创建pd.Series(np.array([1, 2, 3]))。从字典创建时，字典的键自动成为索引。"
        },
        { 
            id: "p1_3", 
            text: "Series的默认索引是？", 
            options: ["0,1,2...", "1,2,3...", "字母", "随机数"], 
            answer: "0,1,2...", 
            explanation: "✅ 正确答案：A（0,1,2...）\n\n📖 详细解析：当创建Series时不指定索引参数，Pandas会自动生成从0开始的整数索引。这与Python列表的索引规则一致，也遵循了编程语言的通用惯例。默认索引类型是RangeIndex，它是Pandas专门为这种连续整数索引优化的数据类型，具有更高的性能。\n\n❌ 选项分析：\n• 选项B（1,2,3...）：错误，这是某些人类语言习惯的计数方式，不是编程语言的标准\n• 选项C（字母）：错误，字母索引需要通过index参数手动指定，如pd.Series([1,2], index=['a','b'])\n• 选项D（随机数）：错误，索引是有序且确定的，按照0,1,2...的顺序递增\n\n💡 知识点扩展：自定义索引后，可以同时通过位置和标签访问数据：s['a']或s[0]。但如果索引是字符串，s[0]可能会产生歧义，建议使用iloc[0]表示位置，loc['a']表示标签。"
        },
        { 
            id: "p1_4", 
            text: "如何获取Series中的值数组？", 
            options: ["values属性", "index属性", "shape属性", "dtype属性"], 
            answer: "values属性", 
            explanation: "✅ 正确答案：A（values属性）\n\n📖 详细解析：Series.values属性返回包含所有值的NumPy数组（numpy.ndarray）。这允许您直接访问底层数据，可以进行各种NumPy操作，如向量化运算、数学函数应用等。需要注意的是，如果Series包含多种数据类型，values可能返回object数组。\n\n❌ 选项分析：\n• 选项B（index属性）：错误，index属性返回的是索引标签对象，不是数据值\n• 选项C（shape属性）：错误，shape返回数据形状元组，如(5,)表示有5个元素\n• 选项D（dtype属性）：错误，dtype返回数据类型，如int64、float64等\n\n💡 知识点扩展：相关属性总结：s.values返回值数组、s.index返回索引对象、s.dtype返回数据类型、s.shape返回形状元组、s.name返回Series名称。如果需要获取Python列表，可使用s.tolist()。"
        },
        { 
            id: "p1_5", 
            text: "Series和DataFrame的主要区别是？", 
            options: ["Series是一维，DataFrame是二维", "两者都是二维", "Series是二维，DataFrame是一维", "两者相同"], 
            answer: "Series是一维，DataFrame是二维", 
            explanation: "✅ 正确答案：A（Series是一维，DataFrame是二维）\n\n📖 详细解析：这是Pandas最核心的概念之一。Series是一维带标签数组，类似Excel中的一列数据，只有行没有列，每个元素有一个标签（索引）。DataFrame是二维带标签表格，类似Excel中的整个表格，有行也有列，每列都是一个Series，可以看作是由多个Series组成的字典。\n\n❌ 选项分析：\n• 选项B（两者都是二维）：错误，Series是一维结构，不是二维\n• 选项C（Series是二维，DataFrame是一维）：错误，说反了，完全混淆了两者的维度\n• 选项D（两者相同）：错误，它们是两种不同的数据结构，用途不同\n\n💡 知识点扩展：DataFrame的每一列都是一个Series，可以通过df['列名']获取。如果需要将Series转为DataFrame，可以使用s.to_frame()方法。理解两者的区别是掌握Pandas的基础。"
        },
        { 
            id: "p1_6", 
            text: "如何创建带自定义索引的Series？", 
            options: ["pd.Series([1,2], index=['a','b'])", "pd.Series([1,2], ['a','b'])", "两者都可以", "两者都不可以"], 
            answer: "两者都可以", 
            explanation: "✅ 正确答案：C（两者都可以）\n\n📖 详细解析：创建带自定义索引的Series有两种等效方式。方式一是显式指定index参数：pd.Series([1, 2], index=['a', 'b'])。方式二是直接传入字典：pd.Series({'a': 1, 'b': 2})，字典的键自动成为索引，值自动成为数据。此外，还可以直接省略index=关键字传参：pd.Series([1,2], ['a','b'])，但这种方式不如显式指定清晰。\n\n❌ 选项分析：\n• 选项A（index=['a','b']）：错误，这是正确的语法，但只是两种方式之一\n• 选项B（['a','b']）：错误，虽然不写index=也能工作，但不如方式一清晰\n• 选项D（两者都不可以）：错误，两种方式都可以正确创建\n\n💡 知识点扩展：推荐使用字典方式创建Series，因为语义更清晰，键值对对应索引和数据，不需要关心数据顺序，可以方便地进行键值查找。创建后可以通过s.index查看索引，通过s.reset_index()重置为默认索引。"
        },
        { 
            id: "p1_7", 
            text: "访问Series中元素的方式是？", 
            options: ["用索引位置", "用索引标签", "两者都可以", "两者都不可以"], 
            answer: "两者都可以", 
            explanation: "✅ 正确答案：C（两者都可以）\n\n📖 详细解析：Series支持两种灵活的访问方式。位置索引使用整数位置，如s[0]访问第一个元素，s[-1]访问最后一个元素，s[0:3]切片访问前3个元素。标签索引使用索引标签，如s['a']访问标签为'a'的元素，s[['a', 'b', 'c']]访问多个标签。这两种方式各有适用场景。\n\n❌ 选项分析：\n• 选项A（用索引位置）：错误，这只是两种方式之一，不完整\n• 选项B（用索引标签）：错误，这也只是两种方式之一，不完整\n• 选项D（两者都不可以）：错误，两种方式都可以使用\n\n💡 知识点扩展：推荐使用iloc和loc访问器来消除歧义：s.iloc[0]显式使用位置，s.loc['a']显式使用标签。这样代码更清晰，避免当索引也是整数时产生混淆。例如s.iloc[0]始终表示第一行，而s[0]在索引为['a','b','c']时会报错。"
        },
        { 
            id: "p1_8", 
            text: "Series的name属性用于？", 
            options: ["给Series命名", "给索引命名", "给数据命名", "给类型命名"], 
            answer: "给Series命名", 
            explanation: "✅ 正确答案：A（给Series命名）\n\n📖 详细解析：Series的name属性用于给整个Series对象命名。当Series是DataFrame的一列时，name属性对应列名。name属性使数据更具可读性，便于理解数据含义。可以在创建时通过name参数设置，也可以之后通过赋值修改。\n\n❌ 选项分析：\n• 选项B（给索引命名）：错误，给索引命名应使用index.name属性，如s.index.name = '产品'\n• 选项C（给数据命名）：错误，数据本身不需要命名，数据值是具体的数值\n• 选项D（给类型命名）：错误，数据类型由dtype属性表示，如int64、float64\n\n💡 知识点扩展：s.name = '销售额'给Series命名，s.index.name = '产品'给索引命名。当Series转为DataFrame列时，Series的name会自动成为列名。如果需要将多个Series合并为DataFrame，name属性尤为重要。"
        },
        { 
            id: "p1_9", 
            text: "如何检查Series中的缺失值？", 
            options: ["isnull()", "isna()", "两者都可以", "两者都不可以"], 
            answer: "两者都可以", 
            explanation: "✅ 正确答案：C（两者都可以）\n\n📖 详细解析：isnull()和isna()在Pandas中功能完全相同，都是用于检测缺失值。isnull()返回布尔Series，缺失值位置为True，非缺失值位置为False。isna()是isnull()的别名，底层调用同一个函数，两者可以互换使用。此外还可以使用全局函数pd.isna(s)，效果相同。\n\n❌ 选项分析：\n• 选项A（isnull()）：错误，这只是其中一种正确方法，不完整\n• 选项B（isna()）：错误，这也是正确方法之一，不完整\n• 选项D（两者都不可以）：错误，两种方法都可以检查缺失值\n\n💡 知识点扩展：缺失值相关函数：s.isnull().sum()统计缺失值数量，s.notna()检测非缺失值，s.dropna()删除缺失值，s.fillna(0)填充缺失值为0。处理缺失值是数据清洗的重要环节，需要根据业务场景选择合适的处理策略。"
        },
        { 
            id: "p1_10", 
            text: "Series和Python列表的主要区别？", 
            options: ["Series有标签索引", "Series只能存数字", "列表有标签索引", "没有区别"], 
            answer: "Series有标签索引", 
            explanation: "✅ 正确答案：A（Series有标签索引）\n\n📖 详细解析：Series相比Python列表有以下核心优势：首先是标签索引，Series每个元素都有标签，可以自定义，可以是字符串，而列表只能用整数位置索引。其次是向量化操作，Series支持广播和向量化运算，性能远超列表循环。第三是统一数据类型，Series要求相同数据类型，性能更好。第四是丰富的API，内置统计、分组、缺失值处理等方法。\n\n❌ 选项分析：\n• 选项B（Series只能存数字）：错误，Series可以存储多种类型，包括字符串、日期等\n• 选项C（列表有标签索引）：错误，Python列表没有标签索引，只能用整数位置\n• 选项D（没有区别）：错误，它们有本质区别，用途不同\n\n💡 知识点扩展：选择使用场景：简单有序数据用列表，需要标签索引、数据分析用Series，需要二维结构用DataFrame。Series可以看作是增强版的列表，专门为数据分析设计。"
        }
    ],
    "02 数据读取与写入": [
        { 
            id: "p2_1", 
            text: "读取CSV文件的正确函数是？", 
            options: ["pd.read_csv()", "pd.load_csv()", "pd.import_csv()", "pd.csv_read()"], 
            answer: "pd.read_csv()", 
            explanation: "✅ 正确答案：A（pd.read_csv()）\n\n📖 详细解析：pd.read_csv()是Pandas读取CSV文件的标准函数。基本语法为pd.read_csv('filename.csv')，返回DataFrame对象。该函数支持多种参数配置，包括分隔符、编码、索引列、数据类型、缺失值处理等，功能非常强大。\n\n❌ 选项分析：\n• 选项B（pd.load_csv()）：错误，Pandas中没有load_csv函数，这不是正确的函数名\n• 选项C（pd.import_csv()）：错误，这是错误的函数名，Pandas不提供此函数\n• 选项D（pd.csv_read()）：错误，Pandas没有这个函数，正确的命名是read_csv\n\n💡 知识点扩展：常用参数包括sep=','指定分隔符（默认逗号）、encoding='utf-8'指定编码格式、index_col='列名'指定索引列、dtype={'列': str}指定数据类型、na_values=['NA', 'N/A']指定缺失值标识。这些参数可以灵活处理各种CSV文件格式。"
        },
        { 
            id: "p2_2", 
            text: "读取Excel文件需要安装哪个库？", 
            options: ["openpyxl", "xlrd", "两者都可以", "都不需要"], 
            answer: "两者都可以", 
            explanation: "✅ 正确答案：C（两者都可以）\n\n📖 详细解析：读取Excel文件需要根据文件格式选择合适的库。openpyxl用于读取.xlsx格式（Excel 2007及以上版本），xlrd用于读取.xls格式（老版本Excel）。pd.read_excel()函数会自动选择合适的库，如果安装了对应的库，会自动使用。\n\n❌ 选项分析：\n• 选项A（openpyxl）：错误，只能处理.xlsx格式，不能处理.xls格式\n• 选项B（xlrd）：错误，只能处理.xls格式，不能处理.xlsx格式\n• 选项D（都不需要）：错误，确实需要安装相应的库才能读取Excel文件\n\n💡 知识点扩展：安装方法为pip install openpyxl xlrd。读取时可以通过engine参数指定引擎：pd.read_excel('file.xlsx', engine='openpyxl')。如果不指定，Pandas会自动检测。需要注意xlrd 2.0+版本不再支持.xlsx格式。"
        },
        { 
            id: "p2_3", 
            text: "df.to_csv('file.csv', index=False)中index=False的作用是？", 
            options: ["不保存索引列", "不保存表头", "不保存数据", "不保存文件"], 
            answer: "不保存索引列", 
            explanation: "✅ 正确答案：A（不保存索引列）\n\n📖 详细解析：to_csv()方法的index参数控制是否保存行索引。默认index=True会将DataFrame的行索引保存为CSV的第一列，这通常不是我们想要的。设置index=False可以避免保存行索引到文件中，这样保存的文件只有数据列，没有额外的索引列，更干净整洁。\n\n❌ 选项分析：\n• 选项B（不保存表头）：错误，表头由header参数控制，header=True保存表头\n• 选项C（不保存数据）：错误，数据会正常保存，不会受到index参数影响\n• 选项D（不保存文件）：错误，文件会被正常保存，参数不影响文件保存\n\n💡 知识点扩展：常用保存参数包括index=False不保存索引、header=True保存表头、encoding='utf-8-sig'支持中文编码（避免Excel乱码）、na_rep='NA'指定缺失值的表示方式。合理设置这些参数可以生成符合需求的CSV文件。"
        },
        { 
            id: "p2_4", 
            text: "如何查看DataFrame的前5行？", 
            options: ["df.head()", "df.tail()", "df.first()", "df.top()"], 
            answer: "df.head()", 
            explanation: "✅ 正确答案：A（df.head()）\n\n📖 详细解析：df.head()是查看数据预览的常用方法。默认返回前5行数据，可传入参数n指定行数：df.head(10)查看前10行。该方法用于快速了解数据结构，检查数据是否正确读取，是数据分析的第一步常用操作。\n\n❌ 选项分析：\n• 选项B（df.tail()）：错误，tail()返回后n行，不是前n行，用于查看末尾数据\n• 选项C（df.first()）：错误，Pandas中没有first()方法，这不是正确的函数名\n• 选项D（df.top()）：错误，Pandas中没有top()方法，正确方法是head()\n\n💡 知识点扩展：相关方法包括df.head(n)查看前n行、df.tail(n)查看后n行、df.sample(n)随机抽取n行。这些方法都是返回新的DataFrame对象，不会修改原数据。在处理大数据时非常有用。"
        },
        { 
            id: "p2_5", 
            text: "df.info()方法可以查看什么？", 
            options: ["数据类型和非空值数量", "数据统计描述", "数据形状", "数据排序"], 
            answer: "数据类型和非空值数量", 
            explanation: "✅ 正确答案：A（数据类型和非空值数量）\n\n📖 详细解析：df.info()提供DataFrame的详细信息，包括所有列的名称、每列的数据类型（int64、float64、object等）、每列的非缺失值数量、DataFrame占用的内存大小。这是了解数据结构的重要方法，在数据清洗前必须使用。\n\n❌ 选项分析：\n• 选项B（数据统计描述）：错误，这应该用df.describe()方法，显示count、mean、std等统计量\n• 选项C（数据形状）：错误，这应该用df.shape属性，返回(行数, 列数)\n• 选项D（数据排序）：错误，这应该用df.sort_values()方法\n\n💡 知识点扩展：df.describe()显示数值列的统计信息，包括count（计数）、mean（均值）、std（标准差）、min、25%、50%、75%、max（分位数）。结合info()和describe()可以全面了解数据概况。"
        },
        { 
            id: "p2_6", 
            text: "读取CSV时如何指定某列为索引？", 
            options: ["index_col参数", "header参数", "usecols参数", "dtype参数"], 
            answer: "index_col参数", 
            explanation: "✅ 正确答案：A（index_col参数）\n\n📖 详细解析：pd.read_csv()的index_col参数用于设置索引列。可以按列名设置（index_col='列名'）、用列位置设置（index_col=0表示第一列）、用多列创建层次索引（index_col=['列1', '列2']）。设置索引列后，可以方便地通过标签访问数据。\n\n❌ 选项分析：\n• 选项B（header参数）：错误，header用于指定表头行，如header=0表示第一行是表头\n• 选项C（usecols参数）：错误，usecols用于选择要读取的列，如usecols=['列1', '列2']\n• 选项D（dtype参数）：错误，dtype用于指定数据类型，如dtype={'列': str}\n\n💡 知识点扩展：pd.read_csv('file.csv', index_col='学号')将学号列作为索引。如果需要将日期列设置为索引并解析为日期格式，可以使用index_col='日期', parse_dates=True。这样可以方便地进行时间序列分析。"
        },
        { 
            id: "p2_7", 
            text: "df.shape返回的是什么？", 
            options: ["(行数, 列数)", "(列数, 行数)", "总元素个数", "数据类型"], 
            answer: "(行数, 列数)", 
            explanation: "✅ 正确答案：A（行数, 列数）\n\n📖 详细解析：df.shape返回DataFrame的形状元组，格式为(row_count, column_count)。第一个数字是行数，第二个是列数。例如(100, 5)表示100行5列的数据。这是检查数据规模的常用方法。\n\n❌ 选项分析：\n• 选项B（列数, 行数）：错误，顺序反了，正确顺序是行在前，列在后\n• 选项C（总元素个数）：错误，这是row×column的结果，可以用df.size获取\n• 选项D（数据类型）：错误，数据类型用df.dtypes属性查看\n\n💡 知识点扩展：df.shape[0]获取行数，df.shape[1]获取列数，len(df)也可以获取行数。这些属性在循环处理或条件判断时非常有用，例如if df.shape[0] > 1000:表示数据行数超过1000行时执行某些操作。"
        },
        { 
            id: "p2_8", 
            text: "如何查看DataFrame的列名？", 
            options: ["df.columns", "df.index", "df.values", "df.dtypes"], 
            answer: "df.columns", 
            explanation: "✅ 正确答案：A（df.columns）\n\n📖 详细解析：df.columns返回DataFrame的所有列名，返回类型是pandas.Index对象，可以像列表一样索引和迭代。列名顺序与DataFrame中的列顺序一致，常用于遍历列或选择特定列。\n\n❌ 选项分析：\n• 选项B（df.index）：错误，这返回行索引，不是列名\n• 选项C（df.values）：错误，这返回数据数组，不包含列名\n• 选项D（df.dtypes）：错误，这返回每列的数据类型，不是列名\n\n💡 知识点扩展：df.columns.tolist()将列名转为列表，df.columns[0]获取第一个列名，for col in df.columns遍历所有列名。在数据处理中，经常需要根据列名进行筛选或操作。"
        },
        { 
            id: "p2_9", 
            text: "df.describe()方法的作用是？", 
            options: ["生成描述性统计", "删除重复值", "处理缺失值", "数据排序"], 
            answer: "生成描述性统计", 
            explanation: "✅ 正确答案：A（生成描述性统计）\n\n📖 详细解析：df.describe()生成数值列的统计摘要，包括count（非空值数量）、mean（平均值）、std（标准差）、min/max（最小/最大值）、25%、50%、75%（四分位数）。这是了解数据分布的重要方法，特别是在数据探索阶段。\n\n❌ 选项分析：\n• 选项B（删除重复值）：错误，这应该用df.drop_duplicates()方法\n• 选项C（处理缺失值）：错误，这应该用df.fillna()或df.dropna()方法\n• 选项D（数据排序）：错误，这应该用df.sort_values()方法\n\n💡 知识点扩展：df.describe(include='all')包含所有类型列的统计信息，df.describe(percentiles=[0.1, 0.9])自定义分位数。对于分类变量，可以使用df['列'].value_counts()查看频率分布。"
        },
        { 
            id: "p2_10", 
            text: "读取大文件时分块读取使用哪个参数？", 
            options: ["chunksize", "blocksize", "partitions", "splitsize"], 
            answer: "chunksize", 
            explanation: "✅ 正确答案：A（chunksize）\n\n📖 详细解析：pd.read_csv()的chunksize参数用于分块读取大型CSV文件。设置后返回一个可迭代的TextFileReader对象，每次迭代返回指定行数的数据块。这避免一次性加载整个文件到内存，防止内存溢出，适合处理GB级数据。\n\n❌ 选项分析：\n• 选项B（blocksize）：错误，Pandas中没有这个参数，这是其他库的命名\n• 选项C（partitions）：错误，这通常指数据库分区操作，不是读取参数\n• 选项D（splitsize）：错误，Pandas中没有这个参数\n\n💡 知识点扩展：使用方式为chunk_iterator = pd.read_csv('bigfile.csv', chunksize=1000)，然后通过for chunk in chunk_iterator循环处理每个数据块。处理完成后可以使用pd.concat()合并结果。这是处理大数据的必备技巧。"
        }
    ],
    "03 数据预览与筛选": [
        { 
            id: "p3_1", 
            text: "df.iloc[0]的作用是？", 
            options: ["获取第一行", "获取第一列", "获取行索引为0的行", "获取列名为0的列"], 
            answer: "获取第一行", 
            explanation: "✅ 正确答案：A（获取第一行）\n\n📖 详细解析：iloc是基于整数位置的索引访问器。df.iloc[0]获取第1行（索引从0开始），df.iloc[0:5]获取前5行，df.iloc[[0,2,4]]获取第1、3、5行。iloc只认位置，不认标签，即使索引是字符串也按位置访问。\n\n❌ 选项分析：\n• 选项B（获取第一列）：错误，iloc用于行选择，获取列需要用df.iloc[:, 0]\n• 选项C（获取行索引为0的行）：错误，这是loc的功能，loc按标签访问\n• 选项D（获取列名为0的列）：错误，这需要用df[0]或df.loc[:, '0']\n\n💡 知识点扩展：iloc与loc的区别：iloc基于整数位置（0, 1, 2...），loc基于行标签（索引名）。例如df.iloc[0]始终是第一行，而df.loc['a']是索引名为'a'的行。推荐使用这两个访问器避免歧义。"
        },
        { 
            id: "p3_2", 
            text: "df.loc['行标签']的作用是？", 
            options: ["按标签获取行", "按位置获取行", "按条件获取行", "按列名获取列"], 
            answer: "按标签获取行", 
            explanation: "✅ 正确答案：A（按标签获取行）\n\n📖 详细解析：loc是基于行标签（索引名）的索引访问器。df.loc['a']获取索引名为'a'的行，df.loc[['a', 'b']]获取多行，df.loc['a':'c']切片获取从'a'到'c'的行（包含两端）。loc只认标签名，不认位置，即使索引是整数也按标签访问。\n\n❌ 选项分析：\n• 选项B（按位置获取行）：错误，这是iloc的功能，iloc按整数位置访问\n• 选项C（按条件获取行）：错误，这需要配合布尔条件，如df.loc[df['列'] > 0]\n• 选项D（按列名获取列）：错误，loc用于行选择，获取列需要用df['列名']\n\n💡 知识点扩展：loc切片是包含性的，df.loc['a':'c']包含a、b、c三行，而iloc切片不包含末尾，df.iloc[0:3]包含0、1、2三行（不含3）。这是两者的重要区别。"
        },
        { 
            id: "p3_3", 
            text: "如何筛选'年龄'大于30的行？", 
            options: ["df[df['年龄'] > 30]", "df[年龄 > 30]", "df.filter(年龄>30)", "df.where(年龄>30)"], 
            answer: "df[df['年龄'] > 30]", 
            explanation: "✅ 正确答案：A（df[df['年龄'] > 30]）\n\n📖 详细解析：布尔索引是Pandas筛选数据的核心方法。df['年龄'] > 30返回布尔Series，True表示满足条件，False表示不满足。df[...]只保留True对应的行，得到筛选结果。布尔条件可以是复杂表达式，支持比较运算符和逻辑运算符。\n\n❌ 选项分析：\n• 选项B（df[年龄 > 30]）：错误，年龄需要加引号作为列名，否则会被当作变量\n• 选项C（df.filter(年龄>30)）：错误，filter()用于列选择，不能处理布尔条件\n• 选项D（df.where(年龄>30)）：错误，where()是赋值方法，不满足条件的位置设为NaN\n\n💡 知识点扩展：多条件筛选使用&（与）和|（或）运算符，每个条件必须用括号括起来。例如df[(df['年龄'] > 30) & (df['城市'] == '北京')]筛选年龄大于30且城市为北京的行。"
        },
        { 
            id: "p3_4", 
            text: "df[['列1', '列2']]的作用是？", 
            options: ["选择多列", "选择多行", "删除多列", "重命名多列"], 
            answer: "选择多列", 
            explanation: "✅ 正确答案：A（选择多列）\n\n📖 详细解析：双括号用于DataFrame列选择。df[['列1', '列2']]返回包含这两列的DataFrame，外层括号表示要选择的列，内层列表指定多个列名。注意单列时df['列名']返回Series，而df[['列名']]返回DataFrame。\n\n❌ 选项分析：\n• 选项B（选择多行）：错误，选择行需要用iloc、loc或布尔索引\n• 选项C（删除多列）：错误，删除列用df.drop(columns=['列1'])\n• 选项D（重命名多列）：错误，重命名用df.rename(columns={})\n\n💡 知识点扩展：df['列名']返回Series，df[['列名']]返回DataFrame。选择连续列可以用df.loc[:, '列1':'列3']，选择不连续列用df[['列1', '列3']]。理解单列和多列选择的区别很重要。"
        },
        { 
            id: "p3_5", 
            text: "df.head(10)和df[:10]的区别？", 
            options: ["功能相同", "head()只能用在行", "切片只能用在列", "没有区别"], 
            answer: "功能相同", 
            explanation: "✅ 正确答案：A（功能相同）\n\n📖 详细解析：df.head(10)和df[:10]功能完全相同，都返回DataFrame的前10行。head()方法更直观明确，代码可读性好，适合明确表示取前n行。[:10]是Python切片语法，更简洁，适合快速操作。两者都返回新的DataFrame对象，不修改原数据。\n\n❌ 选项分析：\n• 选项B（head()只能用在行）：错误，两者都只能用在行上\n• 选项C（切片只能用在列）：错误，切片可以用在行上，df[:10]就是行切片\n• 选项D（没有区别）：错误，虽然功能相同，但这是陷阱选项，A选项更准确\n\n💡 知识点扩展：df.head()默认返回5行，df.head(n)指定行数，df[:n]同head(n)。在链式操作中，切片语法更简洁，如df[df['列'] > 0][:10]。但head()更具可读性，推荐在需要明确表达意图时使用。"
        },
        { 
            id: "p3_6", 
            text: "如何筛选多个条件（与关系）？", 
            options: ["使用&运算符", "使用and关键字", "使用|运算符", "使用or关键字"], 
            answer: "使用&运算符", 
            explanation: "✅ 正确答案：A（使用&运算符）\n\n📖 详细解析：布尔索引中&表示AND（与）关系。每个条件必须用括号括起来，条件之间用&连接，所有条件都为True时结果才为True。这是Pandas中进行多条件筛选的标准方式。\n\n❌ 选项分析：\n• 选项B（使用and关键字）：错误，and是Python关键字，不能用在Series布尔运算中，会报错\n• 选项C（使用|运算符）：错误，|表示OR（或）关系，不是与关系\n• 选项D（使用or关键字）：错误，or是Python关键字，不能用在Series布尔运算中\n\n💡 知识点扩展：df[(df['年龄']>30) & (df['城市']=='北京') & (df['收入']>10000)]同时满足三个条件。注意每个条件必须用括号括起来，因为&的优先级高于比较运算符。"
        },
        { 
            id: "p3_7", 
            text: "如何筛选多个条件（或关系）？", 
            options: ["使用|运算符", "使用or关键字", "使用&运算符", "使用and关键字"], 
            answer: "使用|运算符", 
            explanation: "✅ 正确答案：A（使用|运算符）\n\n📖 详细解析：布尔索引中|表示OR（或）关系。每个条件必须用括号括起来，条件之间用|连接，任一条件为True时结果就为True。这是进行多条件或筛选的标准方式。\n\n❌ 选项分析：\n• 选项B（使用or关键字）：错误，or是Python关键字，不能用在Series布尔运算中\n• 选项C（使用&运算符）：错误，&表示AND（与）关系，不是或关系\n• 选项D（使用and关键字）：错误，and是Python关键字，不能用在Series布尔运算中\n\n💡 知识点扩展：df[(df['城市']=='北京') | (df['城市']=='上海') | (df['城市']=='广州')]筛选城市为北上广的行。也可以用isin()方法简化：df[df['城市'].isin(['北京', '上海', '广州'])]。"
        },
        { 
            id: "p3_8", 
            text: "df.sample(n=5)的作用是？", 
            options: ["随机抽取5行", "排序前5行", "分组前5行", "去重后5行"], 
            answer: "随机抽取5行", 
            explanation: "✅ 正确答案：A（随机抽取5行）\n\n📖 详细解析：sample()方法用于随机抽样。n=5指定抽取5行，frac=0.1抽取10%的行，random_state=42设置随机种子保证可重复。这在数据分析中用于获取数据样本，进行探索性分析。\n\n❌ 选项分析：\n• 选项B（排序前5行）：错误，这应该用df.sort_values().head()或df.nlargest()\n• 选项C（分组前5行）：错误，这应该用df.groupby().head()\n• 选项D（去重后5行）：错误，这应该用df.drop_duplicates().head()\n\n💡 知识点扩展：df.sample(n=5, random_state=42)保证每次运行结果相同，df.sample(frac=0.2)抽取20%的数据。抽样方法包括简单随机抽样、分层抽样等，sample()默认是简单随机抽样。"
        },
        { 
            id: "p3_9", 
            text: "df.nunique()返回的是什么？", 
            options: ["每列唯一值的数量", "每行唯一值的数量", "总唯一值数量", "重复值数量"], 
            answer: "每列唯一值的数量", 
            explanation: "✅ 正确答案：A（每列唯一值的数量）\n\n📖 详细解析：nunique()计算每列唯一值的数量，返回一个Series，索引是列名，值是唯一值数量。默认axis=0按列计算，不包含NaN值（除非dropna=False）。这用于了解分类变量的基数。\n\n❌ 选项分析：\n• 选项B（每行唯一值的数量）：错误，这需要axis=1参数\n• 选项C（总唯一值数量）：错误，这需要.sum()后求和\n• 选项D（重复值数量）：错误，这需要总数量减去唯一值数量\n\n💡 知识点扩展：df.nunique()查看每列唯一值数量，df['列'].nunique()查看某列的唯一值数量，df.nunique(axis=1)计算每行唯一值数量。结合value_counts()可以深入分析数据分布。"
        },
        { 
            id: "p3_10", 
            text: "df.isin([值列表])的作用是？", 
            options: ["筛选属于列表的值", "筛选不属于列表的值", "排除列表中的值", "替换列表中的值"], 
            answer: "筛选属于列表的值", 
            explanation: "✅ 正确答案：A（筛选属于列表的值）\n\n📖 详细解析：isin()用于判断元素是否属于列表，返回布尔DataFrame。常用于筛选：df[df['列'].isin(['值1', '值2'])]。支持列表、元组或集合作为参数。\n\n❌ 选项分析：\n• 选项B（筛选不属于列表的值）：错误，这应该配合~取反\n• 选项C（排除列表中的值）：错误，这应该用~df.isin([...])\n• 选项D（替换列表中的值）：错误，替换应该用df.replace()\n\n💡 知识点扩展：df[df['城市'].isin(['北京', '上海'])]筛选城市为北京或上海的行，df[~df['城市'].isin(['北京', '上海'])]排除这两个城市。isin()是处理分类变量的常用方法，代码更简洁。"
        }
    ],
    "04 数据排序与排名": [
        { 
            id: "p4_1", 
            text: "按'销售额'列升序排序，应使用？", 
            options: ["df.sort_values('销售额')", "df.sort('销售额')", "df.order('销售额')", "df.arrange('销售额')"], 
            answer: "df.sort_values('销售额')", 
            explanation: "✅ 正确答案：A（df.sort_values('销售额')）\n\n📖 详细解析：sort_values()是DataFrame排序的专用方法。默认ascending=True为升序（从小到大），按指定列的值进行排序，返回排序后的新DataFrame（不修改原数据）。可以通过inplace=True参数直接修改原数据。\n\n❌ 选项分析：\n• 选项B（df.sort('销售额')）：错误，Pandas中没有sort()方法\n• 选项C（df.order('销售额')）：错误，order是R语言的函数，Pandas不使用\n• 选项D（df.arrange('销售额')）：错误，arrange是dplyr（R语言）的函数\n\n💡 知识点扩展：df.sort_values('销售额', ascending=False)降序排序，df.sort_values(['列1', '列2'])多列排序（先按列1，再按列2）。还可以指定na_position='first'或'last'控制缺失值位置。"
        },
        { 
            id: "p4_2", 
            text: "按'销售额'列降序排序，应使用？", 
            options: ["df.sort_values('销售额', ascending=False)", "df.sort_values('销售额', descending=True)", "df.sort_values('-销售额')", "df.sort_values('销售额', reverse=True)"], 
            answer: "df.sort_values('销售额', ascending=False)", 
            explanation: "✅ 正确答案：A（df.sort_values('销售额', ascending=False)）\n\n📖 详细解析：ascending参数控制排序方向，ascending=True（默认）升序，ascending=False降序（从大到小）。记住是ascending，不是descending，这是Pandas的标准参数名。\n\n❌ 选项分析：\n• 选项B（descending=True）：错误，这是错误的参数名，Pandas不支持\n• 选项C（-销售额）：错误，字符串前加-不起作用，这不是正确语法\n• 选项D（reverse=True）：错误，这是list的reverse()方法，不是Pandas参数\n\n💡 知识点扩展：df.sort_values('销售额', ascending=False, inplace=True)原地修改原数据，df.sort_values('销售额', ascending=False, ignore_index=True)重置索引。排序后索引会保持原来的值，可以用reset_index()重新设置。"
        },
        { 
            id: "p4_3", 
            text: "按多列排序时，如何指定不同的排序方向？", 
            options: ["df.sort_values(['列1', '列2'], ascending=[True, False])", "df.sort_values(['列1', '列2'], by=['asc', 'desc'])", "df.sort_values(['列1': 'asc', '列2': 'desc'])", "df.sort_values(by=['列1', '列2'], ascending=['asc', 'desc'])"], 
            answer: "df.sort_values(['列1', '列2'], ascending=[True, False])", 
            explanation: "✅ 正确答案：A（df.sort_values(['列1', '列2'], ascending=[True, False])）\n\n📖 详细解析：多列排序时，ascending参数可以是布尔列表，与列名列表对应。df.sort_values(['列1', '列2'], ascending=[True, False])表示先按列1升序，再按列2降序。这是灵活控制排序方向的方法。\n\n❌ 选项分析：\n• 选项B（by=['asc', 'desc']）：错误，ascending参数应该是布尔值列表，不是字符串\n• 选项C（['列1': 'asc', '列2': 'desc']）：错误，这不是有效的列表语法\n• 选项D（ascending=['asc', 'desc']）：错误，ascending参数应该是布尔值，不是字符串\n\n💡 知识点扩展：df.sort_values(['部门', '薪资'], ascending=[True, False])先按部门升序，同部门内按薪资降序。这在业务分析中很常见，如按部门分组后按业绩排序。"
        },
        { 
            id: "p4_4", 
            text: "df.rank()的作用是？", 
            options: ["计算排名", "排序", "去重", "分组"], 
            answer: "计算排名", 
            explanation: "✅ 正确答案：A（计算排名）\n\n📖 详细解析：rank()方法计算每个元素在列中的排名。默认method='average'，相同值取平均排名。排名从1开始，数值越大排名越靠前（默认ascending=True）。可以通过method参数控制相同值的处理方式。\n\n❌ 选项分析：\n• 选项B（排序）：错误，排序是sort_values()的功能\n• 选项C（去重）：错误，去重是drop_duplicates()的功能\n• 选项D（分组）：错误，分组是groupby()的功能\n\n💡 知识点扩展：rank()的method参数包括average（平均排名，默认）、min（最小排名）、max（最大排名）、first（按出现顺序）、dense（密集排名，不跳过名次）。df['排名'] = df['销售额'].rank(ascending=False)计算销售额排名。"
        },
        { 
            id: "p4_5", 
            text: "如何获取某列最大的前5个值？", 
            options: ["df.nlargest(5, '列名')", "df.sort_values('列名', ascending=False).head(5)", "两者都可以", "两者都不可以"], 
            answer: "两者都可以", 
            explanation: "✅ 正确答案：C（两者都可以）\n\n📖 详细解析：获取最大的前5个值有两种方法。df.nlargest(5, '列名')是专用方法，直接返回最大的5行。df.sort_values('列名', ascending=False).head(5)先降序排序再取前5行。两者结果相同，但nlargest()更高效，特别是对于大数据集。\n\n❌ 选项分析：\n• 选项A（df.nlargest(5, '列名')）：错误，这是正确方法，但不是唯一方法\n• 选项B（df.sort_values('列名', ascending=False).head(5)）：错误，这也是正确方法\n• 选项D（两者都不可以）：错误，两种方法都可以\n\n💡 知识点扩展：nlargest()和nsmallest()是针对此场景优化的方法，性能优于排序后取头。还可以指定多列：df.nlargest(5, ['列1', '列2'])按列1优先排序。"
        },
        { 
            id: "p4_6", 
            text: "如何获取某列最小的前3个值？", 
            options: ["df.nsmallest(3, '列名')", "df.sort_values('列名').head(3)", "两者都可以", "两者都不可以"], 
            answer: "两者都可以", 
            explanation: "✅ 正确答案：C（两者都可以）\n\n📖 详细解析：获取最小的前3个值有两种方法。df.nsmallest(3, '列名')是专用方法，直接返回最小的3行。df.sort_values('列名').head(3)先升序排序再取前3行。两者结果相同，但nsmallest()更高效。\n\n❌ 选项分析：\n• 选项A（df.nsmallest(3, '列名')）：错误，这是正确方法，但不是唯一方法\n• 选项B（df.sort_values('列名').head(3)）：错误，这也是正确方法\n• 选项D（两者都不可以）：错误，两种方法都可以\n\n💡 知识点扩展：nlargest()和nsmallest()都支持keep='first'、'last'、'all'参数，控制相同值的处理方式。例如df.nsmallest(3, '列名', keep='last')保留最后出现的相同值。"
        },
        { 
            id: "p4_7", 
            text: "df.sort_index()的作用是？", 
            options: ["按索引排序", "按列排序", "按值排序", "随机排序"], 
            answer: "按索引排序", 
            explanation: "✅ 正确答案：A（按索引排序）\n\n📖 详细解析：sort_index()按行索引进行排序，默认ascending=True升序。这在索引是日期、字母等有序值时非常有用。可以通过axis参数控制按行还是按列索引排序。\n\n❌ 选项分析：\n• 选项B（按列排序）：错误，按列排序应该用sort_values()指定列名\n• 选项C（按值排序）：错误，按值排序是sort_values()的功能\n• 选项D（随机排序）：错误，随机排序是sample(frac=1)的功能\n\n💡 知识点扩展：df.sort_index()按行索引排序，df.sort_index(axis=1)按列索引排序。在时间序列分析中，经常需要按日期索引排序：df.sort_index()。排序后索引会按顺序排列。"
        },
        { 
            id: "p4_8", 
            text: "排序后如何重置索引？", 
            options: ["df.reset_index()", "df.reindex()", "df.index_reset()", "df.new_index()"], 
            answer: "df.reset_index()", 
            explanation: "✅ 正确答案：A（df.reset_index()）\n\n📖 详细解析：reset_index()将当前索引转为普通列，并生成新的从0开始的整数索引。可以通过drop=True参数丢弃原索引，不转为列。这在排序或分组后经常使用，使数据恢复标准索引。\n\n❌ 选项分析：\n• 选项B（df.reindex()）：错误，reindex()是重新设置索引，不是重置\n• 选项C（df.index_reset()）：错误，Pandas中没有这个方法\n• 选项D（df.new_index()）：错误，Pandas中没有这个方法\n\n💡 知识点扩展：df.reset_index(drop=True)重置索引并丢弃原索引，df.reset_index()保留原索引为列。在链式操作中常用：df.sort_values('销售额').reset_index(drop=True)。"
        },
        { 
            id: "p4_9", 
            text: "df.rank(method='dense')的作用是？", 
            options: ["密集排名，不跳过名次", "平均排名", "最小排名", "最大排名"], 
            answer: "密集排名，不跳过名次", 
            explanation: "✅ 正确答案：A（密集排名，不跳过名次）\n\n📖 详细解析：rank()的method='dense'参数表示密集排名，相同值获得相同排名，后续排名不跳过。例如分数为[100, 100, 95]，dense排名为[1, 1, 2]，而默认average排名为[1.5, 1.5, 3]。\n\n❌ 选项分析：\n• 选项B（平均排名）：错误，这是method='average'（默认）\n• 选项C（最小排名）：错误，这是method='min'\n• 选项D（最大排名）：错误，这是method='max'\n\n💡 知识点扩展：rank()的method参数包括：average（平均排名）、min（最小排名）、max（最大排名）、first（按出现顺序排名）、dense（密集排名）。选择哪种方法取决于业务需求。"
        },
        { 
            id: "p4_10", 
            text: "排序时如何处理缺失值？", 
            options: ["通过na_position参数", "通过dropna参数", "无法处理", "自动删除"], 
            answer: "通过na_position参数", 
            explanation: "✅ 正确答案：A（通过na_position参数）\n\n📖 详细解析：sort_values()的na_position参数控制缺失值的位置。na_position='last'（默认）将缺失值放在末尾，na_position='first'将缺失值放在开头。这在排序时确保缺失值不会影响有效数据的顺序。\n\n❌ 选项分析：\n• 选项B（通过dropna参数）：错误，dropna是删除缺失值，不是排序参数\n• 选项C（无法处理）：错误，可以通过参数处理\n• 选项D（自动删除）：错误，不会自动删除，需要手动处理\n\n💡 知识点扩展：df.sort_values('列名', na_position='first')将缺失值排在最前面。如果需要先删除缺失值再排序，可以用df.dropna().sort_values('列名')。"
        }
    ],
    "05 处理缺失值": [
        { 
            id: "p5_1", 
            text: "检测缺失值的方法是？", 
            options: ["isnull()或isna()", "is_empty()", "has_null()", "check_null()"], 
            answer: "isnull()或isna()", 
            explanation: "✅ 正确答案：A（isnull()或isna()）\n\n📖 详细解析：isnull()和isna()在Pandas中功能完全相同，都是用于检测缺失值。返回布尔DataFrame或Series，缺失值位置为True，非缺失值位置为False。这是数据清洗的第一步。\n\n❌ 选项分析：\n• 选项B（is_empty()）：错误，Pandas中没有这个方法\n• 选项C（has_null()）：错误，这不是Pandas的方法\n• 选项D（check_null()）：错误，这不是Pandas的方法\n\n💡 知识点扩展：df.isnull().sum()统计每列缺失值数量，df.isnull().any().any()检查是否有任何缺失值，df.notna()检测非缺失值。处理缺失值是数据清洗的关键步骤。"
        },
        { 
            id: "p5_2", 
            text: "删除包含缺失值的行，应使用？", 
            options: ["df.dropna()", "df.remove_na()", "df.delete_na()", "df.clean_na()"], 
            answer: "df.dropna()", 
            explanation: "✅ 正确答案：A（df.dropna()）\n\n📖 详细解析：dropna()方法删除包含缺失值的行（默认）或列。默认how='any'，只要有一个缺失值就删除；how='all'只有所有值都缺失才删除。可以通过subset参数指定只检查某些列。\n\n❌ 选项分析：\n• 选项B（df.remove_na()）：错误，Pandas中没有这个方法\n• 选项C（df.delete_na()）：错误，这不是Pandas的方法\n• 选项D（df.clean_na()）：错误，这不是Pandas的方法\n\n💡 知识点扩展：df.dropna(subset=['列1', '列2'])只检查列1和列2的缺失值，df.dropna(axis=1)删除包含缺失值的列，df.dropna(thresh=n)保留至少有n个非缺失值的行。"
        },
        { 
            id: "p5_3", 
            text: "填充缺失值为固定值，应使用？", 
            options: ["df.fillna(值)", "df.replace_na(值)", "df.set_na(值)", "df.fill_null(值)"], 
            answer: "df.fillna(值)", 
            explanation: "✅ 正确答案：A（df.fillna(值)）\n\n📖 详细解析：fillna()方法用指定值填充缺失值。可以填充标量值、字典（按列填充不同值）、前向填充或后向填充。这是处理缺失值的常用方法，保留数据完整性。\n\n❌ 选项分析：\n• 选项B（df.replace_na(值)）：错误，Pandas中没有这个方法\n• 选项C（df.set_na(值)）：错误，这不是Pandas的方法\n• 选项D（df.fill_null(值)）：错误，这不是Pandas的方法\n\n💡 知识点扩展：df.fillna(0)填充为0，df.fillna({'列1': 0, '列2': '未知'})按列填充不同值，df.fillna(method='ffill')前向填充（用上一个值填充），df.fillna(method='bfill')后向填充（用下一个值填充）。"
        },
        { 
            id: "p5_4", 
            text: "用均值填充数值列的缺失值，应使用？", 
            options: ["df.fillna(df.mean())", "df.fill_mean()", "df.mean_fill()", "df.na_fill_mean()"], 
            answer: "df.fillna(df.mean())", 
            explanation: "✅ 正确答案：A（df.fillna(df.mean())）\n\n📖 详细解析：df.mean()计算所有数值列的均值，然后fillna()用这些均值填充对应列的缺失值。这是数值列缺失值处理的常用策略，保持数据分布特征。\n\n❌ 选项分析：\n• 选项B（df.fill_mean()）：错误，Pandas中没有这个方法\n• 选项C（df.mean_fill()）：错误，这不是Pandas的方法\n• 选项D（df.na_fill_mean()）：错误，这不是Pandas的方法\n\n💡 知识点扩展：df.fillna(df.median())用中位数填充，df.fillna(df.mode().iloc[0])用众数填充。对于时间序列数据，可以用df.fillna(method='ffill')保持连续性。"
        },
        { 
            id: "p5_5", 
            text: "删除'年龄'列中包含缺失值的行，应使用？", 
            options: ["df.dropna(subset=['年龄'])", "df.dropna('年龄')", "df.cleanna(subset=['年龄'])", "df.remove_na('年龄')"], 
            answer: "df.dropna(subset=['年龄'])", 
            explanation: "✅ 正确答案：A（df.dropna(subset=['年龄'])）\n\n📖 详细解析：dropna()的subset参数指定只检查哪些列的缺失值。dropna(subset=['列1','列2'])表示只有这些列同时有缺失时才删除该行。这允许精确控制哪些列需要考虑缺失值。\n\n❌ 选项分析：\n• 选项B（df.dropna('年龄')）：错误，subset必须作为关键字参数传入\n• 选项C（df.cleanna(subset=['年龄'])）：错误，Pandas中没有cleanna方法\n• 选项D（df.remove_na('年龄')）：错误，Pandas中没有remove_na方法\n\n💡 知识点扩展：df.dropna(subset=['年龄', '姓名'])只有年龄和姓名同时缺失才删除，df.dropna(subset=['年龄'], how='all')只有年龄列缺失才删除（即使其他列有数据）。"
        },
        { 
            id: "p5_6", 
            text: "统计每列缺失值的数量，应使用？", 
            options: ["df.isnull().sum()", "df.count_na()", "df.na_count()", "df.missing().sum()"], 
            answer: "df.isnull().sum()", 
            explanation: "✅ 正确答案：A（df.isnull().sum()）\n\n📖 详细解析：isnull()返回布尔DataFrame，True表示缺失值。sum()对每列求和（True=1, False=0），得到每列缺失值的数量。这是数据探索中必不可少的步骤。\n\n❌ 选项分析：\n• 选项B（df.count_na()）：错误，Pandas中没有这个方法\n• 选项C（df.na_count()）：错误，这不是Pandas的方法\n• 选项D（df.missing().sum()）：错误，Pandas中没有missing()方法\n\n💡 知识点扩展：df.isnull().sum().sum()统计总缺失值数量，df.isnull().mean()计算每列缺失值比例，df.isnull().any()检查每列是否有缺失值。这些组合使用可以全面了解数据质量。"
        },
        { 
            id: "p5_7", 
            text: "用均值填充数值列的缺失值，应使用？", 
            options: ["df['列'].fillna(df['列'].mean())", "df['列'].fill(df['列'].mean())", "df['列'].replace_na(df['列'].mean())", "df['列'].impute(df['列'].mean())"], 
            answer: "df['列'].fillna(df['列'].mean())", 
            explanation: "✅ 正确答案：A（df['列'].fillna(df['列'].mean())）\n\n📖 详细解析：对特定列填充缺失值，先选中该列，然后用fillna()方法，参数为该列的均值。这样只对目标列进行填充，不影响其他列。\n\n❌ 选项分析：\n• 选项B（df['列'].fill(df['列'].mean())）：错误，fill()不是Pandas的方法\n• 选项C（df['列'].replace_na(df['列'].mean())）：错误，replace_na不是Pandas的方法\n• 选项D（df['列'].impute(df['列'].mean())）：错误，impute不是Pandas的方法\n\n💡 知识点扩展：df['列'].fillna(df['列'].median())用中位数填充，df['列'].fillna(df['列'].mode().iloc[0])用众数填充。对于分类变量，可以用df['列'].fillna('未知')填充默认值。"
        },
        { 
            id: "p5_8", 
            text: "检查DataFrame是否有缺失值，应使用？", 
            options: ["df.isnull().any().any()", "df.isnull().exists()", "df.hasna()", "df.any_null()"], 
            answer: "df.isnull().any().any()", 
            explanation: "✅ 正确答案：A（df.isnull().any().any()）\n\n📖 详细解析：isnull().any()返回每列是否有缺失值（True表示有），再调用.any()检查是否有任何列有缺失值。第三个any()检查整体布尔值，返回单个布尔值。\n\n❌ 选项分析：\n• 选项B（df.isnull().exists()）：错误，exists()不是Pandas的方法\n• 选项C（df.hasna()）：错误，这不是Pandas的方法\n• 选项D（df.any_null()）：错误，这不是Pandas的方法\n\n💡 知识点扩展：df.isnull().any()返回每列是否有缺失值，df.isnull().all()检查是否所有值都是缺失值。在数据清洗流程中，可以用这个判断是否需要处理缺失值。"
        },
        { 
            id: "p5_9", 
            text: "删除所有包含缺失值的列（阈值方式），应使用？", 
            options: ["df.dropna(axis=1, thresh=非缺失值数量)", "df.dropna(axis=1, how='all')", "df.clean(axis=1)", "df.remove_na_col()"], 
            answer: "df.dropna(axis=1, thresh=非缺失值数量)", 
            explanation: "✅ 正确答案：A（df.dropna(axis=1, thresh=非缺失值数量)）\n\n📖 详细解析：dropna(axis=1)表示按列删除，thresh参数指定保留列所需的非缺失值最小数量。如thresh=len(df)*0.5表示保留至少50%非缺失值的列。这是根据数据完整性筛选列的常用方法。\n\n❌ 选项分析：\n• 选项B（df.dropna(axis=1, how='all')）：错误，这只删除所有值都缺失的列，不是阈值方式\n• 选项C（df.clean(axis=1)）：错误，clean()不是Pandas的方法\n• 选项D（df.remove_na_col()）：错误，这不是Pandas的方法\n\n💡 知识点扩展：df.dropna(axis=1, thresh=int(len(df)*0.8))保留至少80%非缺失值的列。这在处理质量较差的数据时非常有用，可以过滤掉信息含量太低的列。"
        },
        { 
            id: "p5_10", 
            text: "填充时保持索引不变，应使用？", 
            options: ["fillna()会保持索引", "需要重置索引", "需要指定inplace", "fill()函数"], 
            answer: "fillna()会保持索引", 
            explanation: "✅ 正确答案：A（fillna()会保持索引）\n\n📖 详细解析：fillna()填充后保持原有索引不变，不会改变数据的行顺序或索引标签。如果需要重新排序索引，可以之后再调用reset_index()。这确保数据的对应关系不被破坏。\n\n❌ 选项分析：\n• 选项B（需要重置索引）：错误，fillna()不会改变索引\n• 选项C（需要指定inplace）：错误，inplace控制是否修改原数据，不影响索引\n• 选项D（fill()函数）：错误，Pandas中没有fill()函数\n\n💡 知识点扩展：fillna()的inplace参数控制是否原地修改：df.fillna(0, inplace=True)直接修改原数据，df.fillna(0)返回新对象。无论哪种方式，索引都保持不变。"
        }
    ],
    "06 处理重复值": [
        { 
            id: "p6_1", 
            text: "检测重复行的函数是？", 
            options: ["duplicated()", "duplicate()", "is_duplicate()", "check_duplicate()"], 
            answer: "duplicated()", 
            explanation: "✅ 正确答案：A（duplicated()）\n\n📖 详细解析：duplicated()返回布尔Series，标记是否为重复行（True表示该行之前出现过）。默认keep='first'，第一次出现标记为False，后续重复行标记为True。可以通过keep参数控制标记方式。\n\n❌ 选项分析：\n• 选项B（duplicate()）：错误，多了一个d，正确的是duplicated()\n• 选项C（is_duplicate()）：错误，这不是Pandas的方法\n• 选项D（check_duplicate()）：错误，这不是Pandas的方法\n\n💡 知识点扩展：df.duplicated().sum()统计重复行数量，df.duplicated(subset=['列1', '列2'])只根据指定列判断重复，df.duplicated(keep='last')保留最后一次出现，df.duplicated(keep=False)标记所有重复行。"
        },
        { 
            id: "p6_2", 
            text: "删除重复行，保留第一次出现的行，应使用？", 
            options: ["df.drop_duplicates()", "df.remove_duplicates()", "df.clean_duplicates()", "df.delete_duplicates()"], 
            answer: "df.drop_duplicates()", 
            explanation: "✅ 正确答案：A（df.drop_duplicates()）\n\n📖 详细解析：drop_duplicates()删除重复行。keep='first'（默认）保留首次出现的，keep='last'保留最后一次，keep=False全部删除。返回新的DataFrame，不修改原数据（除非inplace=True）。\n\n❌ 选项分析：\n• 选项B（df.remove_duplicates()）：错误，Pandas中没有这个方法\n• 选项C（df.clean_duplicates()）：错误，这不是Pandas的方法\n• 选项D（df.delete_duplicates()）：错误，这不是Pandas的方法\n\n💡 知识点扩展：df.drop_duplicates(subset=['姓名', '电话'])按多列组合去重，df.drop_duplicates(inplace=True)直接修改原数据，df.drop_duplicates(keep=False)删除所有重复行（包括第一次出现）。"
        },
        { 
            id: "p6_3", 
            text: "只根据'姓名'列去重，应使用？", 
            options: ["df.drop_duplicates(subset=['姓名'])", "df.drop_duplicates('姓名')", "df.drop_duplicates(cols=['姓名'])", "df.unique('姓名')"], 
            answer: "df.drop_duplicates(subset=['姓名'])", 
            explanation: "✅ 正确答案：A（df.drop_duplicates(subset=['姓名'])）\n\n📖 详细解析：subset参数指定用于判断重复的列。drop_duplicates(subset=['列1','列2'])可按多列组合去重。两行姓名和手机号都相同才算重复。\n\n❌ 选项分析：\n• 选项B（df.drop_duplicates('姓名')）：错误，subset参数必须显式指定\n• 选项C（df.drop_duplicates(cols=['姓名'])）：错误，参数名是subset，不是cols\n• 选项D（df.unique('姓名')）：错误，unique()返回唯一值数组，不是去重方法\n\n💡 知识点扩展：df.drop_duplicates(subset=['姓名', '年龄'])按姓名和年龄组合去重，df.drop_duplicates(subset=['姓名'], keep='last')保留每个姓名的最后一条记录。"
        },
        { 
            id: "p6_4", 
            text: "duplicated()默认保留第一次出现的行，标记为？", 
            options: ["False", "True", "None", "0"], 
            answer: "False", 
            explanation: "✅ 正确答案：A（False）\n\n📖 详细解析：duplicated()默认keep='first'，首次出现标记为False，之后的重复行标记为True。这是为了在筛选时方便删除重复行：df[df.duplicated()]可以获取所有重复行。\n\n❌ 选项分析：\n• 选项B（True）：错误，True表示该行是重复的，不是第一次出现\n• 选项C（None）：错误，返回的是布尔值，不是None\n• 选项D（0）：错误，返回的是布尔值，不是整数\n\n💡 知识点扩展：df.duplicated(keep='last')最后一次出现标记为False，df.duplicated(keep=False)所有重复行都标记为True（包括第一次出现）。"
        },
        { 
            id: "p6_5", 
            text: "删除重复行并保留最后一次出现的行，应使用？", 
            options: ["df.drop_duplicates(keep='last')", "df.drop_duplicates(keep='first')", "df.drop_duplicates(keep=False)", "df.drop_duplicates(inplace=True)"], 
            answer: "df.drop_duplicates(keep='last')", 
            explanation: "✅ 正确答案：A（df.drop_duplicates(keep='last')）\n\n📖 详细解析：keep='last'参数保留每组重复行中的最后一条。适合处理如账户最新状态等场景，保留最新记录。\n\n❌ 选项分析：\n• 选项B（df.drop_duplicates(keep='first')）：错误，这保留第一次出现的行\n• 选项C（df.drop_duplicates(keep=False)）：错误，这会删除所有重复行，包括第一次和最后一次\n• 选项D（df.drop_duplicates(inplace=True)）：错误，inplace控制是否修改原数据，不是保留策略\n\n💡 知识点扩展：keep='first'保留首次出现（默认），keep='last'保留最后一次，keep=False删除所有重复行。选择哪种策略取决于业务需求。"
        },
        { 
            id: "p6_6", 
            text: "统计重复行的数量，应使用？", 
            options: ["df.duplicated().sum()", "df.duplicated().count()", "df.count_duplicates()", "df.duplicated().total()"], 
            answer: "df.duplicated().sum()", 
            explanation: "✅ 正确答案：A（df.duplicated().sum()）\n\n📖 详细解析：duplicated()返回布尔Series，sum()计算True的数量即为重复行总数。这是统计重复数据的常用方法。\n\n❌ 选项分析：\n• 选项B（df.duplicated().count()）：错误，count()统计非缺失值数量，不是True的数量\n• 选项C（df.count_duplicates()）：错误，Pandas中没有这个方法\n• 选项D（df.duplicated().total()）：错误，total()不是Pandas的方法\n\n💡 知识点扩展：df.duplicated().sum()统计重复行数，len(df) - df.duplicated().sum()计算非重复行数，df.duplicated().mean()计算重复行比例。"
        },
        { 
            id: "p6_7", 
            text: "删除完全相同的所有重复行（包括第一次），应使用？", 
            options: ["df.drop_duplicates(keep=False)", "df.drop_duplicates(keep=True)", "df.drop_all_duplicates()", "df.remove_all_duplicates()"], 
            answer: "df.drop_duplicates(keep=False)", 
            explanation: "✅ 正确答案：A（df.drop_duplicates(keep=False)）\n\n📖 详细解析：keep=False会删除所有被判定为重复的行，包括第一次出现。仅保留没有重复的行。这在需要完全去重时使用。\n\n❌ 选项分析：\n• 选项B（df.drop_duplicates(keep=True)）：错误，keep参数应该是布尔值或字符串，True不是有效值\n• 选项C（df.drop_all_duplicates()）：错误，Pandas中没有这个方法\n• 选项D（df.remove_all_duplicates()）：错误，这不是Pandas的方法\n\n💡 知识点扩展：keep=False删除所有重复行，keep='first'保留第一次，keep='last'保留最后一次。选择哪种策略取决于业务需求。"
        },
        { 
            id: "p6_8", 
            text: "按多列'姓名'+'手机号'组合判断重复，应使用？", 
            options: ["df.drop_duplicates(subset=['姓名','手机号'])", "df.drop_duplicates(['姓名','手机号'])", "df.drop_duplicates('姓名').drop_duplicates('手机号')", "df.unique(['姓名','手机号'])"], 
            answer: "df.drop_duplicates(subset=['姓名','手机号'])", 
            explanation: "✅ 正确答案：A（df.drop_duplicates(subset=['姓名','手机号'])）\n\n📖 详细解析：subset参数可传入列名列表，表示这些列的值组合起来判断是否重复。两行姓名和手机号都相同才算重复。\n\n❌ 选项分析：\n• 选项B（df.drop_duplicates(['姓名','手机号'])）：错误，subset参数必须显式指定\n• 选项C（df.drop_duplicates('姓名').drop_duplicates('手机号')）：错误，这会先按姓名去重，再按手机号去重，不是组合判断\n• 选项D（df.unique(['姓名','手机号'])）：错误，unique()不能处理多列组合\n\n💡 知识点扩展：df.drop_duplicates(subset=['姓名', '电话', '地址'])按三列组合去重。这在处理复杂数据时非常有用，可以精确控制去重逻辑。"
        },
        { 
            id: "p6_9", 
            text: "在原始DataFrame上直接删除重复行，应使用？", 
            options: ["df.drop_duplicates(inplace=True)", "df.drop_duplicates()返回新对象", "df.duplicated(how='delete')", "df.clean(inplace=True)"], 
            answer: "df.drop_duplicates(inplace=True)", 
            explanation: "✅ 正确答案：A（df.drop_duplicates(inplace=True)）\n\n📖 详细解析：inplace=True参数直接在原DataFrame上修改，不返回新对象。不设置inplace时返回新DataFrame，原数据不变。\n\n❌ 选项分析：\n• 选项B（df.drop_duplicates()返回新对象）：错误，这描述的是默认行为，不是直接修改原数据\n• 选项C（df.duplicated(how='delete')）：错误，duplicated()没有how参数\n• 选项D（df.clean(inplace=True)）：错误，clean()不是Pandas的方法\n\n💡 知识点扩展：inplace=True直接修改原数据，不返回新对象。注意使用inplace后不能链式调用其他方法，因为返回的是None。"
        },
        { 
            id: "p6_10", 
            text: "重复值处理和缺失值处理哪个先做更好？", 
            options: ["先删除重复行再处理缺失值", "先处理缺失值再删除重复行", "顺序无所谓", "两个一起处理"], 
            answer: "先删除重复行再处理缺失值", 
            explanation: "✅ 正确答案：A（先删除重复行再处理缺失值）\n\n📖 详细解析：建议先删除重复行，因为重复行可能包含缺失值，如果先填充缺失值再删重，填充的值会被误认为真实数据。先删重可以减少需要处理的数据量。\n\n❌ 选项分析：\n• 选项B（先处理缺失值再删除重复行）：错误，这样填充的缺失值可能会被误认为真实数据\n• 选项C（顺序无所谓）：错误，顺序会影响结果，需要谨慎选择\n• 选项D（两个一起处理）：错误，Pandas没有同时处理的方法，需要分步进行\n\n💡 知识点扩展：数据清洗的标准流程：1. 删除重复行 2. 处理缺失值 3. 处理异常值 4. 数据类型转换。按照这个顺序可以确保数据质量。"
        }
    ],
    "07 异常值检测与处理": [
        { 
            id: "p7_1", 
            text: "使用IQR方法检测异常值，异常值的范围是？", 
            options: ["小于Q1-1.5*IQR 或 大于Q3+1.5*IQR", "小于Q1-IQR 或 大于Q3+IQR", "小于均值-2倍标准差 或 大于均值+2倍标准差", "小于中位数-1.5倍IQR 或 大于中位数+1.5倍IQR"], 
            answer: "小于Q1-1.5*IQR 或 大于Q3+1.5*IQR", 
            explanation: "✅ 正确答案：A（小于Q1-1.5*IQR 或 大于Q3+1.5*IQR）\n\n📖 详细解析：IQR=Q3-Q1是四分位距。异常值定义：小于Q1-1.5*IQR或大于Q3+1.5*IQR的数据点。这是Tukey's method，是统计中常用的异常值检测方法。\n\n❌ 选项分析：\n• 选项B（小于Q1-IQR 或 大于Q3+IQR）：错误，系数应该是1.5，不是1\n• 选项C（小于均值-2倍标准差 或 大于均值+2倍标准差）：错误，这是Z-score方法的定义\n• 选项D（小于中位数-1.5倍IQR 或 大于中位数+1.5倍IQR）：错误，应该基于Q1和Q3，不是中位数\n\n💡 知识点扩展：Q1是第25百分位数，Q3是第75百分位数，IQR=Q3-Q1。异常值检测是数据清洗的重要环节，需要根据业务场景选择合适的阈值。"
        },
        { 
            id: "p7_2", 
            text: "Z-score方法中，Z-score大于多少通常被认为是异常值？", 
            options: ["2或3", "1", "0.5", "5"], 
            answer: "2或3", 
            explanation: "✅ 正确答案：A（2或3）\n\n📖 详细解析：Z-score表示数据点偏离均值的标准差倍数。|Z|>2或3通常被认为是异常值，|Z|>3是强异常值。常用阈值：2.5、3、3.5。这是基于正态分布的3σ原则。\n\n❌ 选项分析：\n• 选项B（1）：错误，Z=1表示偏离1个标准差，这在正态分布中很常见，不算异常\n• 选项C（0.5）：错误，Z=0.5表示偏离很小，完全正常\n• 选项D（5）：错误，Z=5是极端异常，但通常用3作为阈值\n\n💡 知识点扩展：Z-score = (x - mean) / std。在正态分布中，约95%的数据在±2σ内，约99.7%的数据在±3σ内。超出这些范围的概率很小，被视为异常。"
        },
        { 
            id: "p7_3", 
            text: "计算Z-score的公式是？", 
            options: ["(x-均值)/标准差", "(x-中位数)/标准差", "(最大值-x)/范围", "(x-最小值)/四分位距"], 
            answer: "(x-均值)/标准差", 
            explanation: "✅ 正确答案：A（(x-均值)/标准差）\n\n📖 详细解析：Z-score = (x - mean) / std，表示数据点偏离均值的程度。偏离超过2-3个标准差的点被认为是异常值。这是标准化数据的基础。\n\n❌ 选项分析：\n• 选项B（(x-中位数)/标准差）：错误，应该用均值，不是中位数\n• 选项C（(最大值-x)/范围）：错误，这是归一化的公式，不是Z-score\n• 选项D（(x-最小值)/四分位距）：错误，这与Z-score无关\n\n💡 知识点扩展：Z-score标准化后，数据均值为0，标准差为1。可以用scipy.stats.zscore()计算，也可以用pandas的(df - df.mean()) / df.std()手动计算。"
        },
        { 
            id: "p7_4", 
            text: "将异常值替换为边界值，应使用？", 
            options: ["clip()方法", "replace()方法", "fillna()方法", "dropna()方法"], 
            answer: "clip()方法", 
            explanation: "✅ 正确答案：A（clip()方法）\n\n📖 详细解析：clip()方法将值限制在指定范围内。如df.clip(lower=下界, upper=上界)，超过范围的用边界值替代。这是处理异常值的常用方法，保留数据但限制极端值。\n\n❌ 选项分析：\n• 选项B（replace()方法）：错误，replace()用于替换特定值，不是范围限制\n• 选项C（fillna()方法）：错误，fillna()用于填充缺失值，不是处理异常值\n• 选项D（dropna()方法）：错误，dropna()用于删除缺失值，不是处理异常值\n\n💡 知识点扩展：df['列'].clip(lower=Q1-1.5*IQR, upper=Q3+1.5*IQR)将异常值限制在IQR范围内。也可以用np.where()实现类似功能。"
        },
        { 
            id: "p7_5", 
            text: "删除包含异常值的行，最佳做法是？", 
            options: ["谨慎删除，优先考虑标记和替换", "直接删除所有异常值行", "将异常值设为缺失值后删除", "不需要处理异常值"], 
            answer: "谨慎删除，优先考虑标记和替换", 
            explanation: "✅ 正确答案：A（谨慎删除，优先考虑标记和替换）\n\n📖 详细解析：异常值可能是真实数据（如高收入客户）。建议：先分析异常原因，再决定是删除、替换还是保留。直接删除可能导致数据丢失和偏差。\n\n❌ 选项分析：\n• 选项B（直接删除所有异常值行）：错误，可能误删真实数据，导致数据偏差\n• 选项C（将异常值设为缺失值后删除）：错误，这是间接删除，同样可能丢失重要信息\n• 选项D（不需要处理异常值）：错误，异常值会影响分析结果，需要适当处理\n\n💡 知识点扩展：异常值处理策略：1. 标记异常值 2. 用边界值替换 3. 用均值/中位数替换 4. 删除（最后选择）。需要根据业务场景选择合适的方法。"
        },
        { 
            id: "p7_6", 
            text: "箱线图中，箱体表示数据的？", 
            options: ["Q1到Q3的范围（IQR）", "最小值到最大值", "均值附近区域", "中位数附近区域"], 
            answer: "Q1到Q3的范围（IQR）", 
            explanation: "✅ 正确答案：A（Q1到Q3的范围（IQR））\n\n📖 详细解析：箱线图的箱体由Q1（下四分位数）和Q3（上四分位数）构成，表示中间50%的数据。箱体高度即IQR。箱线图是可视化异常值的有效工具。\n\n❌ 选项分析：\n• 选项B（最小值到最大值）：错误，这是整个数据的范围，不是箱体\n• 选项C（均值附近区域）：错误，箱线图不直接显示均值\n• 选项D（中位数附近区域）：错误，中位数是箱体中间的线，不是箱体本身\n\n💡 知识点扩展：箱线图的组成：箱体（Q1-Q3）、中位线（Q2）、 whiskers（延伸到非异常值的最大最小值）、异常值点（超出whiskers的点）。可以用df.boxplot()或seaborn.boxplot()绘制。"
        },
        { 
            id: "p7_7", 
            text: "标准化后的数据，均值和标准差分别是？", 
            options: ["0和1", "0和0", "1和1", "均值不变，标准差为1"], 
            answer: "0和1", 
            explanation: "✅ 正确答案：A（0和1）\n\n📖 详细解析：Z-score标准化后，数据均值为0，标准差为1。公式：z = (x - mean) / std。这使得不同量纲的数据可以比较，是机器学习数据预处理的常用方法。\n\n❌ 选项分析：\n• 选项B（0和0）：错误，标准差为0表示所有值相同，不是标准化\n• 选项C（1和1）：错误，均值应该是0，不是1\n• 选项D（均值不变，标准差为1）：错误，标准化会改变均值\n\n💡 知识点扩展：标准化方法包括Z-score标准化（均值为0，标准差为1）和Min-Max归一化（范围0-1）。标准化是机器学习数据预处理的必要步骤。"
        },
        { 
            id: "p7_8", 
            text: "使用describe()方法，能直接看到异常值吗？", 
            options: ["不能，需要用其他方法检测", "能，max/min列就是异常值", "能，超出1.5*IQR的会被标记", "能，标准差列会显示异常"], 
            answer: "不能，需要用其他方法检测", 
            explanation: "✅ 正确答案：A（不能，需要用其他方法检测）\n\n📖 详细解析：describe()只显示基本统计量（count、mean、std、min、25%、50%、75%、max），不会自动识别异常值。需要通过IQR或Z-score方法专门检测。\n\n❌ 选项分析：\n• 选项B（能，max/min列就是异常值）：错误，max/min是极值，不一定是异常值\n• 选项C（能，超出1.5*IQR的会被标记）：错误，describe()不会标记异常值\n• 选项D（能，标准差列会显示异常）：错误，标准差是统计量，不直接显示异常值\n\n💡 知识点扩展：检测异常值的方法：IQR方法（Q1-1.5*IQR和Q3+1.5*IQR之外）、Z-score方法（|Z|>3）、箱线图可视化。describe()只是初步了解数据分布。"
        },
        { 
            id: "p7_9", 
            text: "异常值检测中，Z-score方法和IQR方法哪个更敏感？", 
            options: ["Z-score对极端值更敏感", "IQR对极端值更敏感", "两者同样敏感", "取决于数据量大小"], 
            answer: "Z-score对极端值更敏感", 
            explanation: "✅ 正确答案：A（Z-score对极端值更敏感）\n\n📖 详细解析：Z-score基于均值和标准差，极端值会影响均值，因此Z-score对极端值更敏感。IQR基于分位数，更稳健，不受极端值影响。\n\n❌ 选项分析：\n• 选项B（IQR对极端值更敏感）：错误，IQR基于分位数，不受极端值影响\n• 选项C（两者同样敏感）：错误，两者对极端值的敏感度不同\n• 选项D（取决于数据量大小）：错误，敏感度主要取决于方法本身，不是数据量\n\n💡 知识点扩展：Z-score适合近似正态分布的数据，IQR适合任何分布。对于偏态数据，IQR更稳健。在实际应用中，可以结合两种方法进行异常值检测。"
        },
        { 
            id: "p7_10", 
            text: "处理异常值时，将超出3σ原则的数据标记为缺失值，3σ原则指？", 
            options: ["偏离均值超过3个标准差", "偏离中位数超过3个IQR", "小于Q1-3*IQR或大于Q3+3*IQR", "小于均值-3或大于均值+3"], 
            answer: "偏离均值超过3个标准差", 
            explanation: "✅ 正确答案：A（偏离均值超过3个标准差）\n\n📖 详细解析：3σ原则：服从正态分布的数据中，约99.7%的数据落在μ±3σ范围内。超出这个范围的数据概率极低，被视为异常。这是基于正态分布的统计理论。\n\n❌ 选项分析：\n• 选项B（偏离中位数超过3个IQR）：错误，这是基于IQR的方法，不是3σ原则\n• 选项C（小于Q1-3*IQR或大于Q3+3*IQR）：错误，IQR方法通常用1.5，不是3\n• 选项D（小于均值-3或大于均值+3）：错误，应该是3个标准差，不是3\n\n💡 知识点扩展：3σ原则基于正态分布：约68%数据在±1σ内，约95%在±2σ内，约99.7%在±3σ内。超出±3σ的概率仅0.3%，被视为小概率事件。"
        }
    ],
    "08 数据类型转换": [
        { 
            id: "p8_1", 
            text: "查看DataFrame每列的数据类型，应使用？", 
            options: ["df.dtypes", "df.types", "df.type", "df.data_types"], 
            answer: "df.dtypes", 
            explanation: "✅ 正确答案：A（df.dtypes）\n\n📖 详细解析：df.dtypes返回每列的数据类型（dtype对象）。print(df.dtypes)可以看到所有列的类型信息。这是数据清洗的第一步，了解数据类型后才能进行后续处理。\n\n❌ 选项分析：\n• 选项B（df.types）：错误，Pandas中没有types属性\n• 选项C（df.type）：错误，type是Python内置函数，不是Pandas属性\n• 选项D（df.data_types）：错误，Pandas中没有data_types属性\n\n💡 知识点扩展：df.dtypes查看所有列类型，df['列'].dtype查看单列类型，df.select_dtypes(include=['int64', 'float64'])选择数值列。数据类型检查是数据清洗的基础。"
        },
        { 
            id: "p8_2", 
            text: "将'年龄'列从字符串转换为整数，应使用？", 
            options: ["df['年龄'].astype(int)", "df['年龄'].to_int()", "df['年龄'].convert(int)", "df['年龄'].int()"], 
            answer: "df['年龄'].astype(int)", 
            explanation: "✅ 正确答案：A（df['年龄'].astype(int)）\n\n📖 详细解析：astype()方法用于类型转换。可转换的目标类型：int、float、str、datetime、category等。这是Pandas中最常用的类型转换方法。\n\n❌ 选项分析：\n• 选项B（df['年龄'].to_int()）：错误，Pandas中没有to_int()方法\n• 选项C（df['年龄'].convert(int)）：错误，convert()不是Pandas的方法\n• 选项D（df['年龄'].int()）：错误，int()不是Pandas的方法\n\n💡 知识点扩展：df['列'].astype(int)转为整数，df['列'].astype(float)转为浮点数，df['列'].astype(str)转为字符串，df['列'].astype('category')转为分类类型。"
        },
        { 
            id: "p8_3", 
            text: "将字符串日期'2024-01-01'转换为日期类型，应使用？", 
            options: ["pd.to_datetime()", "datetime.strptime()", "date.parse()", "以上都可以"], 
            answer: "以上都可以", 
            explanation: "✅ 正确答案：D（以上都可以）\n\n📖 详细解析：pd.to_datetime()适合处理Series；datetime.strptime()用于单个日期字符串解析；pd.to_datetime()更强大，能处理多种格式。三种方法都可以实现日期转换。\n\n❌ 选项分析：\n• 选项A（pd.to_datetime()）：错误，这是Pandas的方法，可以处理，但不是唯一方法\n• 选项B（datetime.strptime()）：错误，这是Python标准库方法，可以处理单个日期\n• 选项C（date.parse()）：错误，某些库中有parse方法，也可以处理\n\n💡 知识点扩展：pd.to_datetime(df['日期列'])转换整列，pd.to_datetime('2024-01-01')转换单个值，pd.to_datetime(df['日期列'], format='%Y-%m-%d')指定格式提高性能。"
        },
        { 
            id: "p8_4", 
            text: "astype()转换失败时会？", 
            options: ["抛出异常", "返回原数据", "填充为NaN", "自动跳过"], 
            answer: "抛出异常", 
            explanation: "✅ 正确答案：A（抛出异常）\n\n📖 详细解析：astype()在遇到无法转换的值时会抛出异常。如果有缺失值或非标准格式，应先处理或使用pd.to_numeric()的errors参数。这是类型转换的严格模式。\n\n❌ 选项分析：\n• 选项B（返回原数据）：错误，转换失败会报错，不会静默返回原数据\n• 选项C（填充为NaN）：错误，不会自动填充，会报错\n• 选项D（自动跳过）：错误，不会跳过，会报错\n\n💡 知识点扩展：pd.to_numeric(df['列'], errors='coerce')将无法转换的值转为NaN，errors='ignore'忽略错误保持原值。这是处理脏数据的常用方法。"
        },
        { 
            id: "p8_5", 
            text: "pd.to_numeric()的errors='coerce'参数作用是？", 
            options: ["无法转换的值设为NaN", "跳过无法转换的值", "保留原始值不变", "抛出异常"], 
            answer: "无法转换的值设为NaN", 
            explanation: "✅ 正确答案：A（无法转换的值设为NaN）\n\n📖 详细解析：errors='coerce'将无法解析的值转为NaT（Not a Time）或NaN（Not a Number），用于处理脏数据。这是数据清洗中处理异常值的常用方法。\n\n❌ 选项分析：\n• 选项B（跳过无法转换的值）：错误，不是跳过，是转为NaN\n• 选项C（保留原始值不变）：错误，这是errors='ignore'的行为\n• 选项D（抛出异常）：错误，这是默认行为或errors='raise'\n\n💡 知识点扩展：pd.to_numeric(errors='coerce')无法转换的转为NaN，pd.to_datetime(errors='coerce')无法转换的转为NaT。这是处理脏数据的必备技巧。"
        },
        { 
            id: "p8_6", 
            text: "将数值型转换为分类型（类别型），应使用？", 
            options: ["df['列'].astype('category')", "df['列'].astype('class')", "df['列'].to_category()", "df['列'].categorize()"], 
            answer: "df['列'].astype('category')", 
            explanation: "✅ 正确答案：A（df['列'].astype('category')）\n\n📖 详细解析：astype('category')将列转换为分类数据类型，可节省内存。适合取值有限的离散变量如性别、城市等。分类类型在分组和排序时性能更好。\n\n❌ 选项分析：\n• 选项B（df['列'].astype('class')）：错误，'class'不是有效的数据类型\n• 选项C（df['列'].to_category()）：错误，Pandas中没有to_category()方法\n• 选项D（df['列'].categorize()）：错误，Pandas中没有categorize()方法\n\n💡 知识点扩展：df['列'].astype('category')转换分类类型，df['列'].cat.categories查看类别，df['列'].cat.codes获取编码。分类类型在内存和性能上都有优势。"
        },
        { 
            id: "p8_7", 
            text: "字符串的split()方法返回什么类型？", 
            options: ["列表", "字符串", "Series", "DataFrame"], 
            answer: "列表", 
            explanation: "✅ 正确答案：A（列表）\n\n📖 详细解析：str.split()按分隔符拆分字符串，返回包含子字符串的列表。可结合expand=True转为DataFrame。这是字符串处理的常用方法。\n\n❌ 选项分析：\n• 选项B（字符串）：错误，返回的是列表，不是单个字符串\n• 选项C（Series）：错误，返回的是Python列表，不是Pandas Series\n• 选项D（DataFrame）：错误，需要expand=True才会返回DataFrame\n\n💡 知识点扩展：df['列'].str.split(',')返回列表，df['列'].str.split(',', expand=True)返回DataFrame（每部分一列）。这在处理复合字段时非常有用。"
        },
        { 
            id: "p8_8", 
            text: "将字符串列转为大写，应使用？", 
            options: ["df['列'].str.upper()", "df['列'].upper()", "df['列'].to_upper()", "df['列'].uppercase()"], 
            answer: "df['列'].str.upper()", 
            explanation: "✅ 正确答案：A（df['列'].str.upper()）\n\n📖 详细解析：字符串方法需要通过.str访问器调用，如str.upper()、str.lower()、str.strip()、str.replace()等。这是Pandas处理字符串数据的标准方式。\n\n❌ 选项分析：\n• 选项B（df['列'].upper()）：错误，需要通过.str访问器调用字符串方法\n• 选项C（df['列'].to_upper()）：错误，方法名是upper()，不是to_upper()\n• 选项D（df['列'].uppercase()）：错误，方法名是upper()，不是uppercase()\n\n💡 知识点扩展：df['列'].str.upper()转大写，df['列'].str.lower()转小写，df['列'].str.strip()去除空格，df['列'].str.replace('old', 'new')替换字符串。"
        },
        { 
            id: "p8_9", 
            text: "将浮点数列转为整数，小数部分会？", 
            options: ["直接截断（不四舍五入）", "四舍五入", "保留小数部分", "设为0"], 
            answer: "直接截断（不四舍五入）", 
            explanation: "✅ 正确答案：A（直接截断（不四舍五入））\n\n📖 详细解析：astype(int)直接截断小数部分，不进行四舍五入。如5.9转为5，-5.9转为-5。需要四舍五入应先使用round()再转换。这是Pandas的类型转换规则。\n\n❌ 选项分析：\n• 选项B（四舍五入）：错误，astype(int)不会四舍五入\n• 选项C（保留小数部分）：错误，整数类型不能保留小数\n• 选项D（设为0）：错误，不是设为0，是截断小数部分\n\n💡 知识点扩展：df['列'].round().astype(int)先四舍五入再转整数，df['列'].astype(int)直接截断。根据业务需求选择合适的方法。"
        },
        { 
            id: "p8_10", 
            text: "处理字符串列中的空格，应使用？", 
            options: ["str.strip()", "str.trim()", "str.remove()", "str.clean()"], 
            answer: "str.strip()", 
            explanation: "✅ 正确答案：A（str.strip()）\n\n📖 详细解析：str.strip()去除首尾空格；str.lstrip()去左边空格；str.rstrip()去右边空格。全角空格也适用。这是数据清洗中处理字符串的常用方法。\n\n❌ 选项分析：\n• 选项B（str.trim()）：错误，trim是其他语言的方法，Pandas用strip\n• 选项C（str.remove()）：错误，remove()不是Pandas的字符串方法\n• 选项D（str.clean()）：错误，clean()不是Pandas的方法\n\n💡 知识点扩展：df['列'].str.strip()去除首尾空格，df['列'].str.replace(' ', '')去除所有空格，df['列'].str.replace(r'\\s+', ' ', regex=True)合并多个空格。"
        }
    ],
    "09 groupby分组聚合": [
        { 
            id: "p9_1", 
            text: "groupby()的作用是？", 
            options: ["按指定列分组", "对数据排序", "筛选数据", "合并表格"], 
            answer: "按指定列分组", 
            explanation: "✅ 正确答案：A（按指定列分组）\n\n📖 详细解析：groupby()根据一个或多个列的值将数据分成不同的组，返回GroupBy对象，之后可以对接聚合函数。这是数据分析的核心操作，类似于SQL的GROUP BY。\n\n❌ 选项分析：\n• 选项B（对数据排序）：错误，排序是sort_values()的功能\n• 选项C（筛选数据）：错误，筛选是布尔索引的功能\n• 选项D（合并表格）：错误，合并是merge()或concat()的功能\n\n💡 知识点扩展：df.groupby('部门')按部门分组，df.groupby(['部门', '城市'])按多列分组，df.groupby('部门')['销售额'].sum()计算每部门销售额总和。"
        },
        { 
            id: "p9_2", 
            text: "计算每个分组的总和，应使用？", 
            options: ["groupby后调用sum()", "groupby后调用total()", "groupby后调用add()", "groupby后调用aggregate('sum')"], 
            answer: "groupby后调用sum()", 
            explanation: "✅ 正确答案：A（groupby后调用sum()）\n\n📖 详细解析：常用的聚合函数：sum()求和、mean()均值、count()计数、min()/max()最值、std()/var()方差标准差。这些函数可以直接在GroupBy对象上调用。\n\n❌ 选项分析：\n• 选项B（groupby后调用total()）：错误，Pandas中没有total()方法\n• 选项C（groupby后调用add()）：错误，add()是加法运算，不是聚合函数\n• 选项D（groupby后调用aggregate('sum')）：错误，虽然aggregate()可以用，但sum()更直接\n\n💡 知识点扩展：df.groupby('部门').sum()求和，df.groupby('部门').mean()求均值，df.groupby('部门').agg({'销售额': 'sum', '数量': 'count'})多列不同聚合。"
        },
        { 
            id: "p9_3", 
            text: "同时计算多个聚合指标（如总和和均值），应使用？", 
            options: ["agg({'列':['sum','mean']})", "agg(['sum','mean'])", "aggregate(['sum','mean'])", "groupby后分别调用"], 
            answer: "agg({'列':['sum','mean']})", 
            explanation: "✅ 正确答案：A（agg({'列':['sum','mean']})）\n\n📖 详细解析：agg()或aggregate()可以传入字典指定每列使用哪些聚合函数。如df.groupby('部门').agg({'工资':['sum','mean'], '人数':'count'})命名输出列。\n\n❌ 选项分析：\n• 选项B（agg(['sum','mean'])）：错误，这样会对所有列应用相同的聚合\n• 选项C（aggregate(['sum','mean'])）：错误，同选项B\n• 选项D（groupby后分别调用）：错误，虽然可以，但效率低，不是最佳做法\n\n💡 知识点扩展：agg()支持自定义函数，如lambda x: x.max()-x.min()计算极值差。还可以重命名输出列：agg(总工资=('工资', 'sum'), 平均工资=('工资', 'mean'))。"
        },
        { 
            id: "p9_4", 
            text: "按'部门'分组后计算'工资'的平均值，正确写法是？", 
            options: ["df.groupby('部门')['工资'].mean()", "df['工资'].groupby('部门').mean()", "df.groupby('部门').mean('工资')", "df.groupby('部门').agg(mean='工资')"], 
            answer: "df.groupby('部门')['工资'].mean()", 
            explanation: "✅ 正确答案：A（df.groupby('部门')['工资'].mean()）\n\n📖 详细解析：先分组，再选择列，最后聚合。也可以用df.groupby('部门').agg(平均工资=('工资','mean'))命名输出列。这是分组聚合的标准写法。\n\n❌ 选项分析：\n• 选项B（df['工资'].groupby('部门').mean()）：错误，Series没有groupby方法\n• 选项C（df.groupby('部门').mean('工资')）：错误，mean()不接受列名参数\n• 选项D（df.groupby('部门').agg(mean='工资')）：错误，agg参数格式不正确\n\n💡 知识点扩展：df.groupby('部门')['工资'].mean()计算平均工资，df.groupby('部门')['工资'].agg(['sum', 'mean', 'count'])多指标统计。"
        },
        { 
            id: "p9_5", 
            text: "对分组后的结果重置索引，应使用？", 
            options: ["reset_index()", "reset()", "reindex()", "index_reset()"], 
            answer: "reset_index()", 
            explanation: "✅ 正确答案：A（reset_index()）\n\n📖 详细解析：groupby后的结果是MultiIndex，reset_index()将分组键转为普通列，返回常规DataFrame。这是处理分组结果的常用操作。\n\n❌ 选项分析：\n• 选项B（reset()）：错误，Pandas中没有reset()方法\n• 选项C（reindex()）：错误，reindex()是重新设置索引，不是重置\n• 选项D（index_reset()）：错误，Pandas中没有这个方法\n\n💡 知识点扩展：df.groupby('部门').sum().reset_index()将分组键转为列，df.groupby('部门', as_index=False).sum()分组时不设置索引。"
        },
        { 
            id: "p9_6", 
            text: "按多个列分组（如部门和城市），正确写法是？", 
            options: ["groupby(['部门','城市'])", "groupby('部门','城市')", "groupby('部门').groupby('城市')", "groupby(['部门']+['城市'])"], 
            answer: "groupby(['部门','城市'])", 
            explanation: "✅ 正确答案：A（groupby(['部门','城市'])）\n\n📖 详细解析：传入列名列表按多列分组。如groupby(['部门','城市'])，结果按部门-城市的层级组织。这是多维度分析的常用方法。\n\n❌ 选项分析：\n• 选项B（groupby('部门','城市')）：错误，多列分组需要传入列表\n• 选项C（groupby('部门').groupby('城市')）：错误，这样是嵌套分组，不是多列分组\n• 选项D（groupby(['部门']+['城市'])）：错误，列表拼接语法不正确\n\n💡 知识点扩展：df.groupby(['部门', '城市']).sum()按部门和城市组合分组，df.groupby(['部门', '城市']).size()统计每组数量。"
        },
        { 
            id: "p9_7", 
            text: "transform()和agg()的区别是？", 
            options: ["transform返回与原数据等长的Series", "agg返回聚合后的DataFrame", "两者都可用于分组计算", "以上都正确"], 
            answer: "以上都正确", 
            explanation: "✅ 正确答案：D（以上都正确）\n\n📖 详细解析：agg()进行聚合返回汇总数据（行数减少）；transform()进行组内计算返回与原数据等长的结果（常用于添加新列）。两者都是分组计算的重要方法。\n\n❌ 选项分析：\n• 选项A（transform返回与原数据等长的Series）：错误，这是正确的，但不是唯一正确答案\n• 选项B（agg返回聚合后的DataFrame）：错误，这是正确的，但不是唯一正确答案\n• 选项C（两者都可用于分组计算）：错误，这是正确的，但不是唯一正确答案\n\n💡 知识点扩展：df.groupby('部门')['工资'].transform('mean')计算组内均值并广播到原数据长度，常用于添加新列如df['部门平均工资'] = df.groupby('部门')['工资'].transform('mean')。"
        },
        { 
            id: "p9_8", 
            text: "自定义聚合函数（如计算变异系数），应使用？", 
            options: ["agg(自定义函数)或lambda", "apply(自定义函数)", "aggregate(自定义函数)", "任意聚合函数"], 
            answer: "agg(自定义函数)或lambda", 
            explanation: "✅ 正确答案：A（agg(自定义函数)或lambda）\n\n📖 详细解析：agg()支持自定义函数，如lambda x: x.max()-x.min()计算极值差，或def cv(x): return x.std()/x.mean()计算变异系数。这是灵活处理复杂统计需求的方法。\n\n❌ 选项分析：\n• 选项B（apply(自定义函数)）：错误，apply()也可以，但agg()更适合聚合场景\n• 选项C（aggregate(自定义函数)）：错误，aggregate是agg的全称，但选项A更全面\n• 选项D（任意聚合函数）：错误，表述不够具体\n\n💡 知识点扩展：df.groupby('部门').agg(lambda x: x.max() - x.min())计算极差，df.groupby('部门').agg({'工资': ['sum', lambda x: x.std()/x.mean()]})多指标聚合。"
        },
        { 
            id: "p9_9", 
            text: "分组后计算每组的记录数，应使用？", 
            options: ["size()或count()", "len()", "sum()", "只有count()"], 
            answer: "size()或count()", 
            explanation: "✅ 正确答案：A（size()或count()）\n\n📖 详细解析：size()返回每组的元素总数（含NaN）；count()返回每组非NaN值的数量。两者在处理缺失值时有区别。size()更常用，因为它计算所有记录。\n\n❌ 选项分析：\n• 选项B（len()）：错误，len()不能直接用于GroupBy对象\n• 选项C（sum()）：错误，sum()是求和，不是计数\n• 选项D（只有count()）：错误，size()也可以，而且更常用\n\n💡 知识点扩展：df.groupby('部门').size()计算每组总数，df.groupby('部门').count()计算每组非缺失值数量，df.groupby('部门').nunique()计算每组唯一值数量。"
        },
        { 
            id: "p9_10", 
            text: "groupby默认是按列分组，不是按行分组，axis参数默认为？", 
            options: ["0（按行分组）", "1（按列分组）", "不需要设置axis", "None"], 
            answer: "0（按行分组）", 
            explanation: "✅ 正确答案：A（0（按行分组））\n\n📖 详细解析：groupby(axis=0)按行分组（默认）；axis=1按列分组（较少用）。通常我们按某一列的不同值将数据分成多组。这是groupby的基本概念。\n\n❌ 选项分析：\n• 选项B（1（按列分组））：错误，axis=1是按列分组，不是默认\n• 选项C（不需要设置axis）：错误，axis有默认值0\n• 选项D（None）：错误，axis默认值是0，不是None\n\n💡 知识点扩展：df.groupby('部门')等价于df.groupby('部门', axis=0)，df.groupby(lambda x: x%2, axis=1)按列的奇偶性分组（较少用）。"
        }
    ],
    "10 透视表与交叉表": [
        { 
            id: "p10_1", 
            text: "创建透视表的主要函数是？", 
            options: ["pivot_table()", "pivot()", "cross()", "table()"], 
            answer: "pivot_table()", 
            explanation: "✅ 正确答案：A（pivot_table()）\n\n📖 详细解析：pivot_table()创建透视表，是数据分析的重要工具。pivot()是简化版本，功能较少。透视表可以按行和列分组，并计算聚合值。\n\n❌ 选项分析：\n• 选项B（pivot()）：错误，pivot()功能较简单，不能处理重复值\n• 选项C（cross()）：错误，Pandas中没有cross()函数\n• 选项D（table()）：错误，Pandas中没有table()函数\n\n💡 知识点扩展：pd.pivot_table(df, values='销售额', index='部门', columns='月份', aggfunc='sum')创建透视表，是数据分析的常用工具。"
        },
        { 
            id: "p10_2", 
            text: "pivot_table()中，index参数的作用是？", 
            options: ["指定行索引（分组键）", "指定列索引", "指定要汇总的值", "指定聚合函数"], 
            answer: "指定行索引（分组键）", 
            explanation: "✅ 正确答案：A（指定行索引（分组键））\n\n📖 详细解析：index参数设置透视表的行索引（相当于groupby的分组键）；columns设置列标签；values设置要聚合的数据列。这是透视表的三个核心参数。\n\n❌ 选项分析：\n• 选项B（指定列索引）：错误，这是columns参数的作用\n• 选项C（指定要汇总的值）：错误，这是values参数的作用\n• 选项D（指定聚合函数）：错误，这是aggfunc参数的作用\n\n💡 知识点扩展：pd.pivot_table(df, index='部门', columns='月份', values='销售额', aggfunc='sum')按部门和月份分组汇总销售额。"
        },
        { 
            id: "p10_3", 
            text: "pivot_table()中aggfunc默认的聚合函数是？", 
            options: ["mean", "sum", "count", "None"], 
            answer: "mean", 
            explanation: "✅ 正确答案：A（mean）\n\n📖 详细解析：aggfunc默认是mean（求均值）。可以设置为sum、count、median等，也可以传入多个函数列表。这是透视表计算的核心参数。\n\n❌ 选项分析：\n• 选项B（sum）：错误，sum需要显式指定\n• 选项C（count）：错误，count需要显式指定\n• 选项D（None）：错误，默认是mean，不是None\n\n💡 知识点扩展：aggfunc='sum'求和，aggfunc=['sum', 'mean']同时计算多个指标，aggfunc={'销售额': 'sum', '数量': 'count'}不同列不同聚合。"
        },
        { 
            id: "p10_4", 
            text: "pd.crosstab()的作用是？", 
            options: ["计算频数交叉表", "创建透视表", "合并表格", "转置数据"], 
            answer: "计算频数交叉表", 
            explanation: "✅ 正确答案：A（计算频数交叉表）\n\n📖 详细解析：crosstab()专门用于计算两个（或多个）分类变量之间的频数分布表，默认计算计数。这是分析分类变量关系的常用工具。\n\n❌ 选项分析：\n• 选项B（创建透视表）：错误，这是pivot_table()的功能\n• 选项C（合并表格）：错误，这是merge()或concat()的功能\n• 选项D（转置数据）：错误，这是T属性或transpose()的功能\n\n💡 知识点扩展：pd.crosstab(df['性别'], df['部门'])计算性别和部门的交叉频数，pd.crosstab(df['性别'], df['部门'], normalize='all')计算占比。"
        },
        { 
            id: "p10_5", 
            text: "计算各区域各产品的销售额汇总，正确写法是？", 
            options: ["pivot_table(values='销售额', index='区域', columns='产品', aggfunc='sum')", "pivot_table('销售额', '区域', '产品')", "pivot_table(index='区域').columns('产品').values('销售额')", "crosstab('区域','产品')"], 
            answer: "pivot_table(values='销售额', index='区域', columns='产品', aggfunc='sum')", 
            explanation: "✅ 正确答案：A（pivot_table(values='销售额', index='区域', columns='产品', aggfunc='sum')）\n\n📖 详细解析：values指定要聚合的列，index和columns指定行和列的分组键，aggfunc指定聚合方式。这是创建透视表的标准写法。\n\n❌ 选项分析：\n• 选项B（pivot_table('销售额', '区域', '产品')）：错误，参数需要显式指定\n• 选项C（pivot_table(index='区域').columns('产品').values('销售额')）：错误，语法不正确\n• 选项D（crosstab('区域','产品')）：错误，crosstab计算频数，不是销售额汇总\n\n💡 知识点扩展：pd.pivot_table(df, values='销售额', index='区域', columns='产品', aggfunc='sum', margins=True)添加行列合计。"
        },
        { 
            id: "p10_6", 
            text: "crosstab()中margins=True的作用是？", 
            options: ["添加行列合计", "添加利润率", "添加边距", "添加标题"], 
            answer: "添加行列合计", 
            explanation: "✅ 正确答案：A（添加行列合计）\n\n📖 详细解析：margins=True在交叉表最后一行一列添加合计值。margins_name参数可自定义合计列/行的名称，默认为'All'。这是快速查看总计的方法。\n\n❌ 选项分析：\n• 选项B（添加利润率）：错误，crosstab不计算利润率\n• 选项C（添加边距）：错误，margins不是指页面边距\n• 选项D（添加标题）：错误，crosstab不添加标题\n\n💡 知识点扩展：pd.crosstab(df['性别'], df['部门'], margins=True, margins_name='总计')添加名为'总计'的行列合计。"
        },
        { 
            id: "p10_7", 
            text: "透视表和crosstab()的主要区别是？", 
            options: ["crosstab专门计算频数", "crosstab只能用于两个变量", "两者功能完全相同", "crosstab不能指定聚合函数"], 
            answer: "crosstab专门计算频数", 
            explanation: "✅ 正确答案：A（crosstab专门计算频数）\n\n📖 详细解析：crosstab()默认计算频数（count），pivot_table()默认计算均值且更灵活。crosstab也可以通过values和aggfunc参数指定其他聚合。这是两者的主要区别。\n\n❌ 选项分析：\n• 选项B（crosstab只能用于两个变量）：错误，crosstab可以用于多个变量\n• 选项C（两者功能完全相同）：错误，两者有区别，crosstab更专注于频数\n• 选项D（crosstab不能指定聚合函数）：错误，crosstab可以通过aggfunc指定\n\n💡 知识点扩展：crosstab适合快速查看分类变量的频数分布，pivot_table适合复杂的数据汇总分析。根据需求选择合适的工具。"
        },
        { 
            id: "p10_8", 
            text: "透视表中添加合计行和合计列，应设置？", 
            options: ["margins=True", "totals=True", "sum_rows=True", "include_all=True"], 
            answer: "margins=True", 
            explanation: "✅ 正确答案：A（margins=True）\n\n📖 详细解析：margins=True添加All行（行合计）和All列（列合计）。margins_name参数可自定义合计的名称。这是透视表中快速添加总计的方法。\n\n❌ 选项分析：\n• 选项B（totals=True）：错误，Pandas中没有这个参数\n• 选项C（sum_rows=True）：错误，Pandas中没有这个参数\n• 选项D（include_all=True）：错误，Pandas中没有这个参数\n\n💡 知识点扩展：pd.pivot_table(df, values='销售额', index='部门', columns='月份', aggfunc='sum', margins=True, margins_name='总计')。"
        },
        { 
            id: "p10_9", 
            text: "pivot()和pivot_table()的本质区别是？", 
            options: ["pivot()不允许聚合", "pivot_table()不允许聚合", "两者完全相同", "pivot()速度更快"], 
            answer: "pivot()不允许聚合", 
            explanation: "✅ 正确答案：A（pivot()不允许聚合）\n\n📖 详细解析：pivot()要求索引-列-值的组合是唯一的，不允许有重复值；pivot_table()可以处理重复值（通过aggfunc聚合）。这是两者的本质区别。\n\n❌ 选项分析：\n• 选项B（pivot_table()不允许聚合）：错误，pivot_table()可以聚合\n• 选项C（两者完全相同）：错误，两者有本质区别\n• 选项D（pivot()速度更快）：错误，这不是主要区别\n\n💡 知识点扩展：pivot()适合数据已经去重的情况，pivot_table()适合需要聚合的复杂场景。一般推荐使用pivot_table()，功能更强大。"
        },
        { 
            id: "p10_10", 
            text: "计算各产品类别销售额占比（占合计的百分比），应设置？", 
            options: ["normalize='all'", "normalize='index'", "normalize='columns'", "percentage=True"], 
            answer: "normalize='all'", 
            explanation: "✅ 正确答案：A（normalize='all'）\n\n📖 详细解析：normalize参数：'all'或True表示全体为1计算占比；'index'表示每行合计为1；'columns'表示每列合计为1。这是计算占比的便捷方法。\n\n❌ 选项分析：\n• 选项B（normalize='index'）：错误，这是每行合计为1\n• 选项C（normalize='columns'）：错误，这是每列合计为1\n• 选项D（percentage=True）：错误，Pandas中没有这个参数\n\n💡 知识点扩展：pd.crosstab(df['性别'], df['部门'], normalize='all')计算占总体的比例，normalize='index'计算占行的比例，normalize='columns'计算占列的比例。"
        }
    ],
    "11 多表合并": [
        { 
            id: "p11_1", 
            text: "合并两个DataFrame的主要方法是？", 
            options: ["merge()和concat()", "join()和merge()", "append()和concat()", "以上都是"], 
            answer: "以上都是", 
            explanation: "✅ 正确答案：D（以上都是）\n\n📖 详细解析：merge()用于基于列的关联合并；concat()用于拼接（按行或列）；join()用于基于索引的合并；append()已弃用。这些都是Pandas中合并数据的方法。\n\n❌ 选项分析：\n• 选项A（merge()和concat()）：错误，虽然正确，但不是唯一答案\n• 选项B（join()和merge()）：错误，虽然正确，但不是唯一答案\n• 选项C（append()和concat()）：错误，虽然正确，但不是唯一答案\n\n💡 知识点扩展：pd.merge(df1, df2, on='key')基于列合并，pd.concat([df1, df2])拼接，df1.join(df2)基于索引合并。根据场景选择合适的方法。"
        },
        { 
            id: "p11_2", 
            text: "merge()默认的连接方式是？", 
            options: ["inner（内连接）", "outer（外连接）", "left（左连接）", "right（右连接）"], 
            answer: "inner（内连接）", 
            explanation: "✅ 正确答案：A（inner（内连接））\n\n📖 详细解析：merge()默认how='inner'，只保留两边都有的键。其他选项：left（左表全部保留）、right（右表全部保留）、outer（两表全部保留）。这是SQL中的标准连接方式。\n\n❌ 选项分析：\n• 选项B（outer（外连接））：错误，outer需要显式指定how='outer'\n• 选项C（left（左连接））：错误，left需要显式指定how='left'\n• 选项D（right（右连接））：错误，right需要显式指定how='right'\n\n💡 知识点扩展：inner只保留匹配的行，left保留左表所有行，right保留右表所有行，outer保留所有行。根据业务需求选择合适的连接方式。"
        },
        { 
            id: "p11_3", 
            text: "基于'学号'列合并两个表，正确的是？", 
            options: ["pd.merge(df1, df2, on='学号')", "pd.merge(df1, df2, by='学号')", "pd.concat(df1, df2, on='学号')", "pd.join(df1, df2, '学号')"], 
            answer: "pd.merge(df1, df2, on='学号')", 
            explanation: "✅ 正确答案：A（pd.merge(df1, df2, on='学号')）\n\n📖 详细解析：on参数指定连接键（两表列名相同）；如果列名不同，用left_on和right_on分别指定。这是基于列合并的标准写法。\n\n❌ 选项分析：\n• 选项B（pd.merge(df1, df2, by='学号')）：错误，参数名是on，不是by\n• 选项C（pd.concat(df1, df2, on='学号')）：错误，concat()没有on参数\n• 选项D（pd.join(df1, df2, '学号')）：错误，join()语法不正确\n\n💡 知识点扩展：pd.merge(df1, df2, on='学号', how='left')左连接，pd.merge(df1, df2, left_on='学号1', right_on='学号2')列名不同时合并。"
        },
        { 
            id: "p11_4", 
            text: "concat()默认的连接方向是？", 
            options: ["vertical（垂直/纵向拼接）", "horizontal（水平/横向拼接）", "对角拼接", "随机拼接"], 
            answer: "vertical（垂直/纵向拼接）", 
            explanation: "✅ 正确答案：A（vertical（垂直/纵向拼接））\n\n📖 详细解析：concat(axis=0)默认纵向拼接（追加行）；axis=1横向拼接（追加列）。纵向拼接要求列名一致。这是数据拼接的基本概念。\n\n❌ 选项分析：\n• 选项B（horizontal（水平/横向拼接））：错误，这是axis=1的行为\n• 选项C（对角拼接）：错误，Pandas不支持对角拼接\n• 选项D（随机拼接）：错误，Pandas不支持随机拼接\n\n💡 知识点扩展：pd.concat([df1, df2])纵向拼接，pd.concat([df1, df2], axis=1)横向拼接，pd.concat([df1, df2], ignore_index=True)重置索引。"
        },
        { 
            id: "p11_5", 
            text: "纵向拼接两个结构相同的DataFrame，应使用？", 
            options: ["pd.concat([df1, df2])", "pd.merge(df1, df2)", "pd.join(df1, df2)", "pd.append([df1, df2])"], 
            answer: "pd.concat([df1, df2])", 
            explanation: "✅ 正确答案：A（pd.concat([df1, df2])）\n\n📖 详细解析：concat()用于沿指定轴拼接数据。pd.concat([df1, df2])将df2的行追加到df1后面。这是纵向拼接的标准方法。\n\n❌ 选项分析：\n• 选项B（pd.merge(df1, df2)）：错误，merge()是基于列的关联合并，不是拼接\n• 选项C（pd.join(df1, df2)）：错误，join()是基于索引的合并\n• 选项D（pd.append([df1, df2])）：错误，append()已弃用，应使用concat\n\n💡 知识点扩展：pd.concat([df1, df2, df3])拼接多个DataFrame，pd.concat([df1, df2], ignore_index=True)重置索引，pd.concat([df1, df2], keys=['x', 'y'])添加层次索引。"
        },
        { 
            id: "p11_6", 
            text: "合并时处理重复列名（不同列有重叠），应使用？", 
            options: ["suffixes参数", "names参数", "copy参数", "ignore_index参数"], 
            answer: "suffixes参数", 
            explanation: "✅ 正确答案：A（suffixes参数）\n\n📖 详细解析：suffixes=('_left','_right')给左右表的重复列名添加后缀区分，便于识别数据来源。这是处理合并时列名冲突的方法。\n\n❌ 选项分析：\n• 选项B（names参数）：错误，names用于设置索引名称\n• 选项C（copy参数）：错误，copy控制是否复制数据\n• 选项D（ignore_index参数）：错误，ignore_index用于重置索引\n\n💡 知识点扩展：pd.merge(df1, df2, on='key', suffixes=('_1', '_2'))给重复列添加后缀，pd.merge(df1, df2, on='key', suffixes=('', '_y'))只给右表添加后缀。"
        },
        { 
            id: "p11_7", 
            text: "concat(ignore_index=True)的作用是？", 
            options: ["重新生成0,1,2...的连续索引", "忽略索引直接拼接", "删除原索引", "保持原索引不变"], 
            answer: "重新生成0,1,2...的连续索引", 
            explanation: "✅ 正确答案：A（重新生成0,1,2...的连续索引）\n\n📖 详细解析：ignore_index=True忽略原数据的索引，重新生成连续的整数索引。适合合并后不需要保留原索引的场景。这是数据拼接后的常用操作。\n\n❌ 选项分析：\n• 选项B（忽略索引直接拼接）：错误，索引仍然参与拼接，只是最后重置\n• 选项C（删除原索引）：错误，不是删除，是重新生成\n• 选项D（保持原索引不变）：错误，这是ignore_index=False的行为\n\n💡 知识点扩展：pd.concat([df1, df2], ignore_index=True)重置索引，pd.concat([df1, df2]).reset_index(drop=True)等效操作。"
        },
        { 
            id: "p11_8", 
            text: "左连接（左表全部保留），how参数应设为？", 
            options: ["how='left'", "how='right'", "how='inner'", "how='outer'"], 
            answer: "how='left'", 
            explanation: "✅ 正确答案：A（how='left'）\n\n📖 详细解析：how='left'执行左连接，保留左表全部记录，右表没有匹配的显示NaN。'right'相反。这是SQL中的标准连接方式。\n\n❌ 选项分析：\n• 选项B（how='right'）：错误，这是右连接，保留右表全部记录\n• 选项C（how='inner'）：错误，这是内连接，只保留匹配的记录\n• 选项D（how='outer'）：错误，这是外连接，保留所有记录\n\n💡 知识点扩展：left保留左表所有行，right保留右表所有行，inner只保留匹配行，outer保留所有行。根据业务需求选择合适的连接方式。"
        },
        { 
            id: "p11_9", 
            text: "merge()和join()的主要区别是？", 
            options: ["merge基于列，join基于索引", "join基于列，merge基于索引", "两者完全相同", "merge速度更快"], 
            answer: "merge基于列，join基于索引", 
            explanation: "✅ 正确答案：A（merge基于列，join基于索引）\n\n📖 详细解析：merge()通过指定列连接；join()通过索引连接。join()默认左连接，保留了左表索引。这是两者的主要区别。\n\n❌ 选项分析：\n• 选项B（join基于列，merge基于索引）：错误，说反了\n• 选项C（两者完全相同）：错误，两者有本质区别\n• 选项D（merge速度更快）：错误，速度不是主要区别\n\n💡 知识点扩展：df1.join(df2)基于索引合并，df1.merge(df2, left_index=True, right_index=True)等效于join。根据数据特点选择合适的方法。"
        },
        { 
            id: "p11_10", 
            text: "concat(axis=1)横向拼接DataFrame，要求？", 
            options: ["索引必须相同", "行数必须相同", "列数必须相同", "数据类型必须相同"], 
            answer: "索引必须相同", 
            explanation: "✅ 正确答案：A（索引必须相同）\n\n📖 详细解析：axis=1横向拼接时，数据沿列方向扩展，需要两个DataFrame的索引相同，才能正确对齐行。这是横向拼接的基本要求。\n\n❌ 选项分析：\n• 选项B（行数必须相同）：错误，行数可以不同，但索引要对齐\n• 选项C（列数必须相同）：错误，横向拼接列数可以不同\n• 选项D（数据类型必须相同）：错误，数据类型不需要相同\n\n💡 知识点扩展：pd.concat([df1, df2], axis=1)横向拼接，pd.concat([df1, df2], axis=1, join='inner')只保留共同索引的行。"
        }
    ],
    "12 时间序列基础": [
        { 
            id: "p12_1", 
            text: "将字符串日期转换为datetime类型，应使用？", 
            options: ["pd.to_datetime()", "datetime.strptime()", "date.parse()", "以上都可以"], 
            answer: "以上都可以", 
            explanation: "✅ 正确答案：D（以上都可以）\n\n📖 详细解析：pd.to_datetime()是处理Series日期的首选，能自动识别多种日期格式。datetime.strptime()适合单次解析。三种方法都可以实现日期转换。\n\n❌ 选项分析：\n• 选项A（pd.to_datetime()）：错误，这是Pandas的方法，可以处理，但不是唯一方法\n• 选项B（datetime.strptime()）：错误，这是Python标准库方法，可以处理单个日期\n• 选项C（date.parse()）：错误，某些库中有parse方法，也可以处理\n\n💡 知识点扩展：pd.to_datetime(df['日期列'])转换整列，pd.to_datetime('2024-01-01')转换单个值，pd.to_datetime(df['日期列'], format='%Y-%m-%d')指定格式提高性能。"
        },
        { 
            id: "p12_2", 
            text: "设置某列为索引并转为datetime，应使用？", 
            options: ["pd.read_csv(index_col=0, parse_dates=True)", "df.set_index('日期')再df.index=pd.to_datetime(df.index)", "df['日期']=pd.to_datetime(df['日期'])后再set_index", "以上都可以"], 
            answer: "以上都可以", 
            explanation: "✅ 正确答案：D（以上都可以）\n\n📖 详细解析：读取CSV时可直接设置；也可以先转换列再设为索引。parse_dates=True让Pandas尝试解析日期。三种方法都可以实现目标。\n\n❌ 选项分析：\n• 选项A（pd.read_csv(index_col=0, parse_dates=True)）：错误，这是读取时设置，可以工作，但不是唯一方法\n• 选项B（df.set_index('日期')再df.index=pd.to_datetime(df.index)）：错误，这是分步设置，可以工作\n• 选项C（df['日期']=pd.to_datetime(df['日期'])后再set_index）：错误，这是另一种方法，可以工作\n\n💡 知识点扩展：df.set_index('日期', inplace=True)设置索引，df.index = pd.to_datetime(df.index)转换索引类型。时间序列分析需要datetime索引。"
        },
        { 
            id: "p12_3", 
            text: "按月重采样（计算月均值），应使用？", 
            options: ["resample('M').mean()", "groupby(pd.Grouper(freq='M'))", "both A and B", "只能groupby"], 
            answer: "both A and B", 
            explanation: "✅ 正确答案：C（both A and B）\n\n📖 详细解析：resample('M')和groupby(pd.Grouper(freq='M'))都可用。'M'按月重采样，注意'MS'是月初，'M'是月末。两种方法都可以实现按月聚合。\n\n❌ 选项分析：\n• 选项A（resample('M').mean()）：错误，这是正确的方法，但不是唯一方法\n• 选项B（groupby(pd.Grouper(freq='M'))）：错误，这也是正确的方法，但不是唯一方法\n• 选项D（只能groupby）：错误，resample()也可以\n\n💡 知识点扩展：df.resample('M')['销售额'].mean()按月计算均值，df.resample('W')['销售额'].sum()按周求和，df.resample('Q')['销售额'].agg(['sum', 'mean'])按季多指标统计。"
        },
        { 
            id: "p12_4", 
            text: "shift()方法的作用是？", 
            options: ["移动数据（按时间）", "计算差值", "计算增长率", "填充缺失值"], 
            answer: "移动数据（按时间）", 
            explanation: "✅ 正确答案：A（移动数据（按时间））\n\n📖 详细解析：shift(1)将数据向下移动一行（向后一天），shift(-1)向上移动。常用于计算同比/环比变化。这是时间序列分析的重要方法。\n\n❌ 选项分析：\n• 选项B（计算差值）：错误，计算差值用diff()方法\n• 选项C（计算增长率）：错误，计算增长率用pct_change()方法\n• 选项D（填充缺失值）：错误，填充缺失值用fillna()方法\n\n💡 知识点扩展：df['销售额'].shift(1)获取前一天销售额，df['销售额'] - df['销售额'].shift(1)计算日环比，df['销售额'].shift(365)获取去年同期（年同比）。"
        },
        { 
            id: "p12_5", 
            text: "计算销售额的7日滚动平均，应使用？", 
            options: ["rolling(7).mean()", "rolling(7).sum()", "rolling('7D').mean()", "both A and C"], 
            answer: "both A and C", 
            explanation: "✅ 正确答案：D（both A and C）\n\n📖 详细解析：rolling(7)按记录数窗口，rolling('7D')按7天窗口。.mean()计算窗口内均值，可用于平滑数据。两种方法都可以实现7日滚动平均。\n\n❌ 选项分析：\n• 选项A（rolling(7).mean()）：错误，这是按记录数窗口，可以工作，但不是唯一方法\n• 选项B（rolling(7).sum()）：错误，这是求和，不是求平均\n• 选项C（rolling('7D').mean()）：错误，这是按时间窗口，可以工作\n\n💡 知识点扩展：df['销售额'].rolling(window=7).mean()7日滚动平均，df['销售额'].rolling(window=30).mean()30日滚动平均，df['销售额'].rolling(window='7D').mean()按7天窗口平均。"
        },
        { 
            id: "p12_6", 
            text: "datetime64类型数据可以使用dt访问器获取什么？", 
            options: ["年、月、日、星期等", "字符串内容", "数值大小", "数据类型"], 
            answer: "年、月、日、星期等", 
            explanation: "✅ 正确答案：A（年、月、日、星期等）\n\n📖 详细解析：dt.year、dt.month、dt.day、dt.dayofweek等属性可提取日期的各组成部分，用于分组聚合分析。这是时间序列数据处理的常用方法。\n\n❌ 选项分析：\n• 选项B（字符串内容）：错误，dt访问器获取的是数值或属性，不是字符串\n• 选项C（数值大小）：错误，dt访问器获取的是日期组件，不是数值大小\n• 选项D（数据类型）：错误，数据类型用dtype属性查看\n\n💡 知识点扩展：df['日期'].dt.year提取年份，df['日期'].dt.month提取月份，df['日期'].dt.dayofweek提取星期几（0=周一），df['日期'].dt.is_month_end判断是否是月末。"
        },
        { 
            id: "p12_7", 
            text: "asfreq('D')的作用是？", 
            options: ["将数据转为指定频率", "计算频率", "设置频率限制", "检测频率"], 
            answer: "将数据转为指定频率", 
            explanation: "✅ 正确答案：A（将数据转为指定频率）\n\n📖 详细解析：asfreq()改变时间序列的频率。如月数据转日数据：'D'日、'W'周、'MS'月初、'M'月末。新频率的数据用NaN填充或前向填充。这是时间序列重采样的方法。\n\n❌ 选项分析：\n• 选项B（计算频率）：错误，asfreq()不计算频率，是转换频率\n• 选项C（设置频率限制）：错误，asfreq()不是设置限制\n• 选项D（检测频率）：错误，检测频率用df.index.freq\n\n💡 知识点扩展：df.asfreq('D')转为日频率，df.asfreq('D', method='ffill')前向填充，df.asfreq('D', method='bfill')后向填充。"
        },
        { 
            id: "p12_8", 
            text: "pct_change()的作用是？", 
            options: ["计算百分比变化", "改变数据类型", "移动数据", "重置索引"], 
            answer: "计算百分比变化", 
            explanation: "✅ 正确答案：A（计算百分比变化）\n\n📖 详细解析：pct_change()计算当前值与前一个值的百分比变化，默认periods=1。相当于(df-df.shift())/df.shift()。这是计算增长率的标准方法。\n\n❌ 选项分析：\n• 选项B（改变数据类型）：错误，改变数据类型用astype()\n• 选项C（移动数据）：错误，移动数据用shift()\n• 选项D（重置索引）：错误，重置索引用reset_index()\n\n💡 知识点扩展：df['销售额'].pct_change()计算日环比，df['销售额'].pct_change(periods=7)计算周环比，df['销售额'].pct_change(periods=365)计算年同比。"
        },
        { 
            id: "p12_9", 
            text: "时间序列数据中，用什么表示缺失的时间点？", 
            options: ["NaT (Not a Time)", "NaN", "None", "空字符串"], 
            answer: "NaT (Not a Time)", 
            explanation: "✅ 正确答案：A（NaT (Not a Time)）\n\n📖 详细解析：NaT是datetime特有的缺失值表示（Not a Time），相当于数值列的NaN。可以用isna()检测。这是时间序列数据缺失值的标准表示。\n\n❌ 选项分析：\n• 选项B（NaN）：错误，NaN用于数值缺失，datetime用NaT\n• 选项C（None）：错误，None是Python的NoneType，不是Pandas的缺失值\n• 选项D（空字符串）：错误，空字符串是字符串类型，不是缺失值\n\n💡 知识点扩展：pd.isna()可以检测NaT，df['日期'].isna()检测日期缺失，pd.to_datetime('NaT')创建NaT值。处理时间序列缺失值是数据清洗的重要环节。"
        },
        { 
            id: "p12_10", 
            text: "创建日期范围，应使用？", 
            options: ["pd.date_range()", "pd.period_range()", "pd.timedelta_range()", "以上都可以"], 
            answer: "以上都可以", 
            explanation: "✅ 正确答案：D（以上都可以）\n\n📖 详细解析：date_range()创建日期时间索引；period_range()创建时期索引；timedelta_range()创建时间差索引。各有不同用途。这是Pandas时间序列的基础功能。\n\n❌ 选项分析：\n• 选项A（pd.date_range()）：错误，这是创建日期范围，可以工作，但不是唯一方法\n• 选项B（pd.period_range()）：错误，这是创建时期范围，可以工作\n• 选项C（pd.timedelta_range()）：错误，这是创建时间差范围，可以工作\n\n💡 知识点扩展：pd.date_range('2024-01-01', periods=10)创建10天日期，pd.date_range('2024-01-01', '2024-12-31', freq='M')创建月末日期，pd.date_range('2024-01-01', periods=12, freq='MS')创建月初日期。"
        }
    ]
};

const quizData = Object.values(questionBank).flat();
