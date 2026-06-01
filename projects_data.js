const projectsData = [
    {
        id: 'project1',
        title: '🧹 数据清洗实战',
        description: '处理订单数据中的脏数据，掌握数据清洗的完整流程',
        difficulty: '入门',
        duration: '45分钟',
        detail: {
            overview: {
                title: '项目概览',
                difficulty: '入门',
                duration: '45分钟',
                objectives: [
                    '掌握数据探查的常用方法（info、describe、isnull、duplicated）',
                    '学会识别和处理重复值、缺失值',
                    '能够筛选有效数据，排除异常值',
                    '掌握数据类型转换和格式统一',
                    '理解数据清洗的完整流程和最佳实践'
                ]
            },
            background: '在当今数据驱动的商业环境中，数据分析的质量直接取决于数据的质量。某电商平台每天产生数万条订单记录，但由于系统对接问题、人工录入错误、网络延迟等原因，原始数据中经常存在各种"脏数据"：重复订单、缺失的客户信息、异常的金额数值、格式混乱的日期等等。作为数据分析师，你的首要任务就是对这些数据进行清洗和预处理。数据清洗是数据分析流程中最耗时但也是最关键的环节，通常占整个分析工作的60%-80%。一份干净、准确的数据集是后续进行销售分析、客户画像、库存管理等高级分析的基础。本项目模拟了一个真实的电商订单场景，你将学习如何识别数据质量问题，并运用专业的数据清洗技术处理这些问题，最终输出一份高质量的数据集供后续分析使用。',
            dataset: {
                description: '模拟电商订单数据，包含订单号、客户ID、产品类别、订单金额、下单日期、订单状态等字段，人为添加了各种数据质量问题：重复订单、缺失值、负数金额、异常大额订单等。',
                fields: [
                    { name: '订单号', type: 'string', desc: '订单唯一标识，格式如 ORD001' },
                    { name: '客户ID', type: 'string', desc: '客户唯一标识，格式如 C001' },
                    { name: '产品类别', type: 'string', desc: '产品分类：电子产品/办公用品/家具' },
                    { name: '订单金额', type: 'float', desc: '订单支付金额（单位：元）' },
                    { name: '下单日期', type: 'string', desc: '订单生成日期' },
                    { name: '订单状态', type: 'string', desc: '状态：已完成/处理中/已发货' }
                ],
                code: `import pandas as pd
import numpy as np

# 创建模拟订单数据（包含各种数据质量问题）
orders = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD002', 'ORD003', 'ORD004', 'ORD005', 'ORD006', 'ORD007', 'ORD008', 'ORD009', 'ORD010', 'ORD011'],
    '客户ID': ['C001', 'C002', 'C002', 'C003', None, 'C005', 'C006', 'C007', 'C008', 'C009', 'C010', 'C011'],
    '产品类别': ['电子产品', '办公用品', '办公用品', '电子产品', '家具', '办公用品', '电子产品', '家具', None, '电子产品', '办公用品', '电子产品'],
    '订单金额': [15800, 3200, 3200, 22500, 8500, -500, 19800, 150000, 7200, 4500, 12800, 28900],
    '下单日期': ['2024-01-15', '2024-01-15', '2024-01-15', '2024-01-16', '2024-01-16', '2024-01-17', '2024-01-17', '2024-01-18', '2024-01-18', '2024-01-19', '2024-01-20', '2024-01-21'],
    '订单状态': ['已完成', '处理中', '处理中', '已完成', '已发货', '已完成', None, '已完成', '已完成', '处理中', '已发货', '已完成']
})

print("=== 原始订单数据（包含脏数据）===")
print(orders)
print(f"\\n数据规模: {orders.shape[0]}行 x {orders.shape[1]}列")`,
                keyPoints: [
                    { 
                        name: 'info()', 
                        desc: '查看数据基本信息，包括列名、数据类型、非空数量',
                        example: 'orders.info()'
                    },
                    { 
                        name: 'isnull()', 
                        desc: '检测缺失值，返回布尔DataFrame',
                        example: 'orders.isnull().sum()'
                    },
                    { 
                        name: 'duplicated()', 
                        desc: '检测重复记录',
                        example: 'orders.duplicated().sum()'
                    },
                    { 
                        name: 'drop_duplicates()', 
                        desc: '删除重复记录，keep参数控制保留方式',
                        example: 'orders.drop_duplicates(keep="first")'
                    },
                    { 
                        name: 'fillna()', 
                        desc: '填充缺失值',
                        example: 'orders["客户ID"].fillna("未知")'
                    },
                    { 
                        name: 'dropna()', 
                        desc: '删除包含缺失值的行/列',
                        example: 'orders.dropna(subset=["订单状态"])'
                    },
                    { 
                        name: 'pd.to_datetime()', 
                        desc: '转换日期格式',
                        example: 'pd.to_datetime(orders["下单日期"])'
                    },
                    { 
                        name: 'astype()', 
                        desc: '转换数据类型',
                        example: 'orders["订单金额"].astype(int)'
                    }
                ]
            },
            tasks: [
                {
                    title: '任务1：数据探查与质量评估',
                    objective: '全面了解数据结构，识别潜在的数据质量问题，为后续清洗制定策略',
                    hint: '使用info()查看数据类型，isnull().sum()统计缺失值，duplicated().sum()统计重复值，describe()查看数值分布',
                    steps: [
                        '步骤1：使用orders.info()查看数据基本信息。这会显示数据的行数、列数、各列名称、数据类型和非空值数量。特别关注哪些列有缺失值，以及数值型字段的类型是否正确（如金额是否为float类型）。',
                        '步骤2：使用orders.isnull().sum()统计每列的缺失值数量。这能帮你快速定位数据完整性问题，判断哪些字段需要重点处理。对于客户ID、产品类别等关键字段，缺失值可能意味着数据严重不完整。',
                        '步骤3：使用orders.duplicated().sum()检查重复记录。重复记录会导致统计结果被高估，必须在分析前处理。如果存在重复，使用orders[orders.duplicated(keep=False)]查看重复的具体内容。',
                        '步骤4：使用describe()查看订单金额的统计描述。重点关注count（有效数据数）、min（最小值是否为负）、max（是否有异常大额），识别潜在的异常值问题。'
                    ],
                    code: `# TODO: 数据探查与质量评估
print("=== 【任务1】数据探查与质量评估 ===\\n")

# 1. 查看数据基本信息（列名、数据类型、非空数量）
print("1. 数据基本信息:")
orders.info()

# 2. 统计各列缺失值数量
print("\\n2. 缺失值统计:")
missing_counts = orders.isnull().sum()
print(missing_counts)

# 3. 统计重复记录数量
print("\\n3. 重复值统计:")
duplicate_count = orders.duplicated().sum()
print(f"重复记录数: {duplicate_count}")
if duplicate_count > 0:
    print("重复记录详情:")
    print(orders[orders.duplicated(keep=False)])

# 4. 查看数值型字段的统计描述
print("\\n4. 订单金额统计描述:")
print(orders['订单金额'].describe())

# 5. 检查异常值（金额为负数或零）
print("\\n5. 异常金额检查:")
negative_amount = orders[orders['订单金额'] <= 0]
print(f"金额异常记录数: {len(negative_amount)}")
if len(negative_amount) > 0:
    print(negative_amount[['订单号', '订单金额']])`,
                    answer: `print("=== 【任务1】数据探查与质量评估 ===\\n")

# 1. 查看数据基本信息（列名、数据类型、非空数量）
print("1. 数据基本信息:")
orders.info()

# 2. 统计各列缺失值数量
print("\\n2. 缺失值统计:")
missing_counts = orders.isnull().sum()
print(missing_counts)

# 3. 统计重复记录数量
print("\\n3. 重复值统计:")
duplicate_count = orders.duplicated().sum()
print(f"重复记录数: {duplicate_count}")
if duplicate_count > 0:
    print("重复记录详情:")
    print(orders[orders.duplicated(keep=False)])

# 4. 查看数值型字段的统计描述
print("\\n4. 订单金额统计描述:")
print(orders['订单金额'].describe())

# 5. 检查异常值（金额为负数或零）
print("\\n5. 异常金额检查:")
negative_amount = orders[orders['订单金额'] <= 0]
print(f"金额异常记录数: {len(negative_amount)}")
if len(negative_amount) > 0:
    print(negative_amount[['订单号', '订单金额']])`,
                    expected: '显示数据有12行6列；客户ID、产品类别、订单状态各有1个缺失值；1条重复记录；订单金额统计信息；1条负数金额记录',
                    commonErrors: [
                        '错误1：忘记使用keep=False参数查看所有重复记录，导致只看到部分重复数据',
                        '错误2：直接使用describe()而不指定数值型列，导致日期等非数值列被忽略',
                        '错误3：忽略info()输出中的数据类型信息，后续处理时出现类型错误',
                        '错误4：没有检查describe()中的min值，遗漏了负数金额等异常值'
                    ]
                },
                {
                    title: '任务2：删除重复记录',
                    objective: '识别并删除完全重复的订单记录，确保数据唯一性',
                    hint: '使用duplicated()标记重复记录，drop_duplicates()删除重复记录，keep参数控制保留哪一条',
                    steps: [
                        '步骤1：在删除前先查看原始数据的记录数，使用len(orders)获取总记录数，这可以作为后续验证的基准。同时可以查看重复记录的具体内容，确认哪些记录是重复的。',
                        '步骤2：使用orders.drop_duplicates(keep="first")删除重复记录。keep参数有三个可选值："first"保留第一条，"last"保留最后一条，False删除所有重复记录。选择合适的策略取决于业务需求。',
                        '步骤3：将清洗后的数据保存到新变量orders_clean，这样可以保留原始数据作为备份，便于后续验证和回溯。',
                        '步骤4：验证删除结果，检查删除后的记录数是否符合预期，并使用duplicated().sum()确认没有剩余的重复记录。'
                    ],
                    code: `# TODO: 删除重复记录
print("\\n=== 【任务2】删除重复记录 ===\\n")

# 查看删除前的数据量
print(f"删除前记录数: {len(orders)}")

# 删除重复记录，保留第一次出现的记录
orders_clean = orders.drop_duplicates(keep='first')

# 查看删除后的数据量
print(f"删除后记录数: {len(orders_clean)}")
print(f"删除的重复记录数: {len(orders) - len(orders_clean)}")

# 验证重复记录已删除
print("\\n验证重复记录已删除:")
print(f"剩余重复记录数: {orders_clean.duplicated().sum()}")`,
                    answer: `print("\\n=== 【任务2】删除重复记录 ===\\n")

# 查看删除前的数据量
print(f"删除前记录数: {len(orders)}")

# 删除重复记录，保留第一次出现的记录
orders_clean = orders.drop_duplicates(keep='first')

# 查看删除后的数据量
print(f"删除后记录数: {len(orders_clean)}")
print(f"删除的重复记录数: {len(orders) - len(orders_clean)}")

# 验证重复记录已删除
print("\\n验证重复记录已删除:")
print(f"剩余重复记录数: {orders_clean.duplicated().sum()}")`,
                    expected: '删除前12条，删除后11条，成功删除1条重复记录',
                    commonErrors: [
                        '错误1：忘记将结果保存到新变量，导致原始数据被覆盖，无法回溯',
                        '错误2：使用drop_duplicates()时没有指定keep参数，默认保留第一条，但业务可能需要保留最后一条',
                        '错误3：没有验证删除结果，遗漏了某些重复记录',
                        '错误4：使用inplace=True参数直接修改原数据，导致无法恢复'
                    ]
                },
                {
                    title: '任务3：智能处理缺失值',
                    objective: '根据业务规则处理不同字段的缺失值，选择合适的填充或删除策略',
                    hint: '使用fillna()填充缺失值，dropna()删除无法修复的记录。客户ID和产品类别可以填充默认值，订单状态缺失建议删除',
                    steps: [
                        '步骤1：处理前先查看各列的缺失值数量，使用isnull().sum()统计，了解哪些字段有缺失以及缺失的严重程度，这决定了采用哪种处理策略。',
                        '步骤2：对于客户ID字段的缺失值，使用fillna("未知客户")填充。因为客户ID缺失时，订单的其他信息（如金额、日期）仍然有价值，可以保留用于分析。',
                        '步骤3：对于产品类别字段的缺失值，使用fillna("未分类")填充。这样在后续按类别统计时，可以单独分析"未分类"这一类别的情况。',
                        '步骤4：对于订单状态字段的缺失值，使用dropna(subset=["订单状态"])删除。因为订单状态是订单的核心属性，缺失意味着这条记录信息严重不完整，无法进行有效分析。',
                        '步骤5：处理完成后再次检查缺失值，确保所有缺失都已处理完毕，并记录处理后剩余的记录数。'
                    ],
                    code: `# TODO: 智能处理缺失值
print("\\n=== 【任务3】智能处理缺失值 ===\\n")

# 查看处理前的缺失值情况
print("处理前缺失值统计:")
print(orders_clean.isnull().sum())

# 策略1：客户ID缺失填充为"未知客户"
orders_clean['客户ID'] = orders_clean['客户ID'].fillna('未知客户')

# 策略2：产品类别缺失填充为"未分类"
orders_clean['产品类别'] = orders_clean['产品类别'].fillna('未分类')

# 策略3：订单状态缺失的记录无法修复，直接删除
orders_clean = orders_clean.dropna(subset=['订单状态'])

# 查看处理后的缺失值情况
print("\\n处理后缺失值统计:")
print(orders_clean.isnull().sum())
print(f"\\n处理后剩余记录数: {len(orders_clean)}")`,
                    answer: `print("\\n=== 【任务3】智能处理缺失值 ===\\n")

# 查看处理前的缺失值情况
print("处理前缺失值统计:")
print(orders_clean.isnull().sum())

# 策略1：客户ID缺失填充为"未知客户"
orders_clean['客户ID'] = orders_clean['客户ID'].fillna('未知客户')

# 策略2：产品类别缺失填充为"未分类"
orders_clean['产品类别'] = orders_clean['产品类别'].fillna('未分类')

# 策略3：订单状态缺失的记录无法修复，直接删除
orders_clean = orders_clean.dropna(subset=['订单状态'])

# 查看处理后的缺失值情况
print("\\n处理后缺失值统计:")
print(orders_clean.isnull().sum())
print(f"\\n处理后剩余记录数: {len(orders_clean)}")`,
                    expected: '处理后各列缺失值均为0，剩余10条记录',
                    commonErrors: [
                        '错误1：对所有缺失值都采用同样的处理策略，没有根据业务规则区分对待',
                        '错误2：忘记保存处理结果到变量，导致处理没有生效',
                        '错误3：删除记录时没有指定subset参数，导致所有包含缺失值的行都被删除',
                        '错误4：填充时使用了不合适的默认值，影响后续分析结果'
                    ]
                },
                {
                    title: '任务4：筛选有效订单数据',
                    objective: '过滤掉异常和无效的订单记录，确保数据质量',
                    hint: '使用布尔索引筛选，订单金额必须大于0，订单状态必须为有效状态',
                    steps: [
                        '步骤1：查看筛选前的订单金额分布，使用min()和max()获取最小和最大金额，了解数据范围，识别可能存在的异常值。记录最小金额是否正常。',
                        '步骤2：使用布尔索引筛选订单金额大于0的记录，订单金额为负数通常是录入错误或测试数据，必须过滤掉。使用orders_clean[orders_clean["订单金额"] > 0]筛选。',
                        '步骤3：检查异常大额订单，通常电商订单金额超过10万可能是数据错误或特殊订单，需要单独标记出来检查，但不一定要删除，视业务需求而定。',
                        '步骤4：使用isin()方法筛选订单状态为有效值的记录，只保留状态为"已完成"、"处理中"、"已发货"的订单。',
                        '步骤5：验证筛选结果，查看剩余记录数和数据详情，确认筛选后的数据数量符合预期，并且所有记录都是有效的。'
                    ],
                    code: `# TODO: 筛选有效订单数据
print("\\n=== 【任务4】筛选有效订单数据 ===\\n")

# 查看筛选前的订单金额分布
print("筛选前订单金额范围:")
print(f"最小金额: {orders_clean['订单金额'].min()}")
print(f"最大金额: {orders_clean['订单金额'].max()}")

# 筛选条件1：订单金额必须大于0
orders_clean = orders_clean[orders_clean['订单金额'] > 0]

# 筛选条件2：检查异常大额订单（超过10万可能是数据错误）
print("\\n检查异常大额订单:")
large_orders = orders_clean[orders_clean['订单金额'] > 100000]
print(f"金额超过10万的订单数: {len(large_orders)}")
if len(large_orders) > 0:
    print(large_orders[['订单号', '订单金额']])

# 筛选条件3：订单状态必须是有效值
valid_status = ['已完成', '处理中', '已发货']
orders_clean = orders_clean[orders_clean['订单状态'].isin(valid_status)]

print(f"\\n筛选后剩余记录数: {len(orders_clean)}")
print("筛选后的订单数据:")
print(orders_clean[['订单号', '客户ID', '订单金额', '订单状态']])`,
                    answer: `print("\\n=== 【任务4】筛选有效订单数据 ===\\n")

# 查看筛选前的订单金额分布
print("筛选前订单金额范围:")
print(f"最小金额: {orders_clean['订单金额'].min()}")
print(f"最大金额: {orders_clean['订单金额'].max()}")

# 筛选条件1：订单金额必须大于0
orders_clean = orders_clean[orders_clean['订单金额'] > 0]

# 筛选条件2：检查异常大额订单（超过10万可能是数据错误）
print("\\n检查异常大额订单:")
large_orders = orders_clean[orders_clean['订单金额'] > 100000]
print(f"金额超过10万的订单数: {len(large_orders)}")
if len(large_orders) > 0:
    print(large_orders[['订单号', '订单金额']])

# 筛选条件3：订单状态必须是有效值
valid_status = ['已完成', '处理中', '已发货']
orders_clean = orders_clean[orders_clean['订单状态'].isin(valid_status)]

print(f"\\n筛选后剩余记录数: {len(orders_clean)}")
print("筛选后的订单数据:")
print(orders_clean[['订单号', '客户ID', '订单金额', '订单状态']])`,
                    expected: '筛选后剩余9条有效订单记录，排除了负数金额和异常大额订单',
                    commonErrors: [
                        '错误1：忘记先检查金额筛选后的数据覆盖了原来的数据，没有保存筛选前的数据丢失',
                        '错误2：isin()方法中的状态列表写错了，比如写成了错误的状态名称',
                        '错误3：筛选异常值的阈值设置不合理，导致误删了正常的大额订单',
                        '错误4：筛选条件使用了<=0而不是>0，导致金额为0的订单被保留'
                    ]
                },
                {
                    title: '任务5：统一日期格式与数据类型转换',
                    objective: '将日期字符串转换为标准日期格式，优化数据类型，为后续分析做准备',
                    hint: '使用pd.to_datetime()转换日期格式，使用astype()转换其他数据类型',
                    steps: [
                        '步骤1：查看转换前各列的数据类型，使用orders_clean.dtypes查看，确认哪些字段需要转换。特别关注日期字段和金额字段的类型。',
                        '步骤2：使用pd.to_datetime()将下单日期从字符串类型转换为datetime64类型，这样才能进行日期运算，如计算日期差、按日期分组等。',
                        '步骤3：将订单金额从float64类型转换为int64类型，因为金额数据都是整数，这样可以节省内存空间并提高运算效率。',
                        '步骤4：查看转换后的数据类型，确认日期字段和金额字段的数据类型已经正确转换。',
                        '步骤5：验证日期转换结果，查看转换后的日期列，使用min()和max()方法获取最早和最晚下单日期，确认日期数据正确无误。'
                    ],
                    code: `# TODO: 统一日期格式与数据类型转换
print("\\n=== 【任务5】统一日期格式与数据类型转换 ===\\n")

# 查看转换前的数据类型
print("转换前的数据类型:")
print(orders_clean.dtypes)

# 1. 将下单日期转换为datetime格式
orders_clean['下单日期'] = pd.to_datetime(orders_clean['下单日期'])

# 2. 将订单金额转换为整数类型（金额通常为整数）
orders_clean['订单金额'] = orders_clean['订单金额'].astype(int)

# 查看转换后的数据类型
print("\\n转换后的数据类型:")
print(orders_clean.dtypes)

# 验证日期格式转换成功
print("\\n下单日期转换结果:")
print(orders_clean['下单日期'])
print(f"\\n最早下单日期: {orders_clean['下单日期'].min().strftime('%Y-%m-%d')}")
print(f"最晚下单日期: {orders_clean['下单日期'].max().strftime('%Y-%m-%d')}")`,
                    answer: `print("\\n=== 【任务5】统一日期格式与数据类型转换 ===\\n")

# 查看转换前的数据类型
print("转换前的数据类型:")
print(orders_clean.dtypes)

# 1. 将下单日期转换为datetime格式
orders_clean['下单日期'] = pd.to_datetime(orders_clean['下单日期'])

# 2. 将订单金额转换为整数类型（金额通常为整数）
orders_clean['订单金额'] = orders_clean['订单金额'].astype(int)

# 查看转换后的数据类型
print("\\n转换后的数据类型:")
print(orders_clean.dtypes)

# 验证日期格式转换成功
print("\\n下单日期转换结果:")
print(orders_clean['下单日期'])
print(f"\\n最早下单日期: {orders_clean['下单日期'].min().strftime('%Y-%m-%d')}")
print(f"最晚下单日期: {orders_clean['下单日期'].max().strftime('%Y-%m-%d')}")`,
                    expected: '下单日期转换为datetime64类型，订单金额转换为int64类型，显示日期范围为2024-01-15至2024-01-21',
                    commonErrors: [
                        '错误1：日期字符串格式不统一，导致pd.to_datetime()转换失败，需要检查日期格式',
                        '错误2：忘记import pandas as pd，但这里通常已经导入了，主要错误是忘记pd前缀',
                        '错误3：金额中有小数，直接用astype(int)会丢失精度，应该先检查是否有小数',
                        '错误4：使用了strftime()而不是pd.to_datetime()，日期仍然是字符串类型'
                    ]
                },
                {
                    title: '任务6：数据清洗结果汇总与验证',
                    objective: '生成数据清洗报告，验证清洗效果，完成整个数据清洗流程',
                    hint: '使用各种统计方法验证数据质量，生成清洗报告，保存最终数据',
                    steps: [
                        '步骤1：统计清洗前后的数据量变化，使用shape[0]获取记录数，计算清洗率，了解数据质量问题的严重程度，清洗率不宜过高也不宜过低。',
                        '步骤2：进行数据质量验证，使用isnull().sum().sum()统计总缺失值数，duplicated().sum()统计重复记录数，检查是否还有负数金额，验证日期格式是否正确。',
                        '步骤3：使用groupby()按产品类别分组统计销售情况，计算订单数量、销售总额和平均金额，round(2)保留两位小数，了解各类产品的销售表现。',
                        '步骤4：使用value_counts()按订单状态统计，了解订单的处理进度分布，为后续业务分析提供数据支持。',
                        '步骤5：使用to_csv()将清洗后的数据保存为CSV文件，设置index=False避免保存索引列，encoding="utf-8-sig"确保中文在Excel中正常显示。'
                    ],
                    code: `# TODO: 数据清洗结果汇总与验证
print("\\n=== 【任务6】数据清洗结果汇总与验证 ===\\n")

# 1. 数据规模统计
print("【清洗结果汇总】")
print(f"原始数据: {orders.shape[0]}条记录")
print(f"清洗后数据: {orders_clean.shape[0]}条记录")
print(f"清洗率: {((orders.shape[0] - orders_clean.shape[0]) / orders.shape[0] * 100):.1f}%")

# 2. 数据质量验证
print("\\n【数据质量验证】")
print(f"✓ 缺失值数量: {orders_clean.isnull().sum().sum()}")
print(f"✓ 重复记录数量: {orders_clean.duplicated().sum()}")
print(f"✓ 负数金额数量: {len(orders_clean[orders_clean['订单金额'] <= 0])}")
print(f"✓ 日期格式正确: {orders_clean['下单日期'].dtype == 'datetime64[ns]'}")

# 3. 按产品类别统计销售情况
print("\\n【按产品类别销售统计】")
sales_by_category = orders_clean.groupby('产品类别').agg(
    订单数量=('订单号', 'count'),
    销售总额=('订单金额', 'sum'),
    平均金额=('订单金额', 'mean')
).round(2)
print(sales_by_category)

# 4. 按订单状态统计
print("\\n【按订单状态统计】")
status_counts = orders_clean['订单状态'].value_counts()
print(status_counts)

# 5. 保存清洗后的数据
orders_clean.to_csv('cleaned_orders.csv', index=False, encoding='utf-8-sig')
print("\\n✅ 清洗完成！数据已保存为 cleaned_orders.csv")`,
                    answer: `print("\\n=== 【任务6】数据清洗结果汇总与验证 ===\\n")

# 1. 数据规模统计
print("【清洗结果汇总】")
print(f"原始数据: {orders.shape[0]}条记录")
print(f"清洗后数据: {orders_clean.shape[0]}条记录")
print(f"清洗率: {((orders.shape[0] - orders_clean.shape[0]) / orders.shape[0] * 100):.1f}%")

# 2. 数据质量验证
print("\\n【数据质量验证】")
print(f"✓ 缺失值数量: {orders_clean.isnull().sum().sum()}")
print(f"✓ 重复记录数量: {orders_clean.duplicated().sum()}")
print(f"✓ 负数金额数量: {len(orders_clean[orders_clean['订单金额'] <= 0])}")
print(f"✓ 日期格式正确: {orders_clean['下单日期'].dtype == 'datetime64[ns]'}")

# 3. 按产品类别统计销售情况
print("\\n【按产品类别销售统计】")
sales_by_category = orders_clean.groupby('产品类别').agg(
    订单数量=('订单号', 'count'),
    销售总额=('订单金额', 'sum'),
    平均金额=('订单金额', 'mean')
).round(2)
print(sales_by_category)

# 4. 按订单状态统计
print("\\n【按订单状态统计】")
status_counts = orders_clean['订单状态'].value_counts()
print(status_counts)

# 5. 保存清洗后的数据
orders_clean.to_csv('cleaned_orders.csv', index=False, encoding='utf-8-sig')
print("\\n✅ 清洗完成！数据已保存为 cleaned_orders.csv")`,
                    expected: '显示清洗前后的数据对比，数据质量验证全部通过，按产品类别和订单状态的统计结果，最后提示数据已保存',
                    commonErrors: [
                        '错误1：to_csv()忘记设置index=False，导致保存的CSV文件中多了一列索引列',
                        '错误2：忘记设置encoding="utf-8-sig"，导致在Excel中打开时中文显示乱码',
                        '错误3：groupby()的agg()方法中列名写错，比如把"订单号"写成了"订单编号"',
                        '错误4：忘记使用round(2)保留小数，导致平均金额显示很多位小数，不够美观'
                    ]
                }
            ],
            completeCode: `import pandas as pd
import numpy as np

# 创建模拟订单数据
orders = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD002', 'ORD003', 'ORD004', 'ORD005', 'ORD006', 'ORD007', 'ORD008', 'ORD009', 'ORD010', 'ORD011'],
    '客户ID': ['C001', 'C002', 'C002', 'C003', None, 'C005', 'C006', 'C007', 'C008', 'C009', 'C010', 'C011'],
    '产品类别': ['电子产品', '办公用品', '办公用品', '电子产品', '家具', '办公用品', '电子产品', '家具', None, '电子产品', '办公用品', '电子产品'],
    '订单金额': [15800, 3200, 3200, 22500, 8500, -500, 19800, 150000, 7200, 4500, 12800, 28900],
    '下单日期': ['2024-01-15', '2024-01-15', '2024-01-15', '2024-01-16', '2024-01-16', '2024-01-17', '2024-01-17', '2024-01-18', '2024-01-18', '2024-01-19', '2024-01-20', '2024-01-21'],
    '订单状态': ['已完成', '处理中', '处理中', '已完成', '已发货', '已完成', None, '已完成', '已完成', '处理中', '已发货', '已完成']
})

print("=== 原始订单数据（包含脏数据）===")
print(orders)

# ========== 任务1：数据探查 ==========
print("\\n=== 【任务1】数据探查 ===")
orders.info()
print("\\n缺失值:", orders.isnull().sum().tolist())
print("重复记录:", orders.duplicated().sum())

# ========== 任务2：删除重复记录 ==========
orders_clean = orders.drop_duplicates(keep='first')

# ========== 任务3：处理缺失值 ==========
orders_clean['客户ID'] = orders_clean['客户ID'].fillna('未知客户')
orders_clean['产品类别'] = orders_clean['产品类别'].fillna('未分类')
orders_clean = orders_clean.dropna(subset=['订单状态'])

# ========== 任务4：筛选有效订单 ==========
orders_clean = orders_clean[orders_clean['订单金额'] > 0]
valid_status = ['已完成', '处理中', '已发货']
orders_clean = orders_clean[orders_clean['订单状态'].isin(valid_status)]

# ========== 任务5：数据类型转换 ==========
orders_clean['下单日期'] = pd.to_datetime(orders_clean['下单日期'])
orders_clean['订单金额'] = orders_clean['订单金额'].astype(int)

# ========== 任务6：结果汇总 ==========
print("\\n=== 【清洗完成】===")
print(f"原始: {len(orders)}条 → 清洗后: {len(orders_clean)}条")
print("\\n清洗后数据:")
print(orders_clean)
orders_clean.to_csv('cleaned_orders.csv', index=False, encoding='utf-8-sig')
print("\\n✅ 数据已保存为 cleaned_orders.csv")`,
            challenges: [
                {
                    title: '挑战1：高级缺失值处理',
                    description: '对于客户ID缺失的记录，尝试通过订单号规律来推断可能的客户ID。观察订单号的格式（ORD001、ORD002等），思考是否可以通过某种规则来填充或标记这些记录。提示：可以考虑根据下单日期和订单金额来分组，找到可能属于同一客户的订单模式。'
                },
                {
                    title: '挑战2：异常值检测与处理',
                    description: '除了负数金额，还有哪些异常值需要处理？比如异常大额订单（如150000元），如何判断它是真实数据还是错误数据？尝试实现一个基于统计方法的异常值检测函数。提示：可以使用Z-score或IQR方法来检测异常值。'
                }
            ],
            summary: {
                keyPoints: [
                    '数据探查：使用info()、describe()、isnull()、duplicated()等方法全面了解数据',
                    '重复值处理：使用drop_duplicates()删除重复记录',
                    '缺失值处理：根据业务规则选择填充（fillna()）或删除（dropna()）策略',
                    '数据筛选：使用布尔索引和isin()方法筛选有效数据',
                    '类型转换：使用pd.to_datetime()和astype()转换数据类型'
                ],
                nextSteps: [
                    '学习更高级的数据清洗技术，如正则表达式处理文本数据',
                    '了解数据标准化和归一化的方法',
                    '学习使用pandas-profiling等工具生成自动化的数据质量报告',
                    '尝试处理更复杂的数据集，如包含日期时间、文本、数值等多种类型的数据'
                ]
            }
        }
    },
    {
        id: 'project2',
        title: '📊 分组聚合分析',
        description: '掌握Pandas分组聚合操作，实现多维度数据统计分析',
        difficulty: '进阶',
        duration: '60分钟',
        detail: {
            overview: {
                title: '项目概览',
                difficulty: '进阶',
                duration: '60分钟',
                objectives: [
                    '掌握groupby()分组操作',
                    '学会使用agg()进行多指标聚合',
                    '理解分组后的数据操作',
                    '能进行多级分组和透视表操作',
                    '掌握分组聚合的实际应用场景'
                ]
            },
            background: '在数据分析中，分组聚合是最常用的操作之一。例如，按地区统计销售额、按产品类别计算平均价格、按时间维度分析销售趋势等。某电商公司需要对销售数据进行多维度分析，包括按产品类别统计销售情况、按地区分析客户分布、按时间周期观察销售趋势等。通过分组聚合分析，可以快速从海量数据中提取有价值的业务洞察，为决策提供数据支持。',
            dataset: {
                description: '模拟电商销售数据，包含订单号、客户ID、地区、产品类别、销售额、利润、下单日期等字段。',
                fields: [
                    { name: '订单号', type: 'string', desc: '订单唯一标识' },
                    { name: '客户ID', type: 'string', desc: '客户唯一标识' },
                    { name: '地区', type: 'string', desc: '销售地区：华东/华北/华南/西南' },
                    { name: '产品类别', type: 'string', desc: '产品分类：电子产品/办公用品/家具' },
                    { name: '销售额', type: 'float', desc: '销售金额（元）' },
                    { name: '利润', type: 'float', desc: '利润金额（元）' },
                    { name: '下单日期', type: 'string', desc: '订单日期' }
                ],
                code: `import pandas as pd
import numpy as np

# 创建模拟销售数据
data = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005', 'ORD006', 'ORD007', 'ORD008', 'ORD009', 'ORD010'],
    '客户ID': ['C001', 'C002', 'C003', 'C004', 'C005', 'C006', 'C007', 'C008', 'C009', 'C010'],
    '地区': ['华东', '华北', '华南', '西南', '华东', '华北', '华南', '西南', '华东', '华北'],
    '产品类别': ['电子产品', '办公用品', '家具', '电子产品', '办公用品', '家具', '电子产品', '办公用品', '家具', '电子产品'],
    '销售额': [15800, 3200, 8500, 22500, 19800, 15000, 7200, 4500, 12800, 28900],
    '利润': [3160, 640, 1700, 4500, 3960, 3000, 1440, 900, 2560, 5780],
    '下单日期': ['2024-01-15', '2024-01-15', '2024-01-16', '2024-01-16', '2024-01-17', '2024-01-17', '2024-01-18', '2024-01-18', '2024-01-19', '2024-01-19']
})

print("=== 销售数据 ===")
print(data)`
            },
            tasks: [
                {
                    title: '任务1：按产品类别分组统计',
                    objective: '计算每个产品类别的销售总额、利润总额和订单数量',
                    hint: '使用groupby()按产品类别分组，然后使用agg()进行聚合计算',
                    steps: [
                        '步骤1：使用data.groupby("产品类别")按产品类别进行分组，这会创建一个GroupBy对象，包含按产品类别划分的数据子集。',
                        '步骤2：在groupby()之后使用.agg()方法进行聚合计算，传入字典参数，指定每个列使用什么聚合函数（sum、count、mean等）。',
                        '步骤3：为聚合结果指定合适的列名，如"销售总额"、"利润总额"、"订单数量"、"平均销售额"，提高可读性。',
                        '步骤4：使用.round(2)将结果保留两位小数，使统计数据更加美观和专业，然后使用print()输出结果。'
                    ],
                    code: `# TODO: 按产品类别分组统计
print("=== 按产品类别分组统计 ===")

# 按产品类别分组，计算销售总额、利润总额和订单数量
category_stats = data.groupby('产品类别').agg(
    销售总额=('销售额', 'sum'),
    利润总额=('利润', 'sum'),
    订单数量=('订单号', 'count'),
    平均销售额=('销售额', 'mean')
).round(2)

print(category_stats)`,
                    answer: `print("=== 按产品类别分组统计 ===")

category_stats = data.groupby('产品类别').agg(
    销售总额=('销售额', 'sum'),
    利润总额=('利润', 'sum'),
    订单数量=('订单号', 'count'),
    平均销售额=('销售额', 'mean')
).round(2)

print(category_stats)`,
                    expected: '显示每个产品类别的销售总额、利润总额、订单数量和平均销售额',
                    commonErrors: [
                        '错误1：忘记在agg()中指定列名和聚合函数的对应关系，导致结果列名不清晰',
                        '错误2：使用groupby()后忘记使用聚合函数，直接打印GroupBy对象，看不到实际统计结果',
                        '错误3：聚合函数名写错，比如把"sum"写成了"summ"，或者把"count"写成了"cnt"',
                        '错误4：没有使用.round()保留小数，导致结果有很多位小数，不够美观和专业'
                    ]
                },
                {
                    title: '任务2：按地区分组统计',
                    objective: '分析各地区的销售表现',
                    hint: '使用groupby()按地区分组，计算相关指标',
                    steps: [
                        '步骤1：使用data.groupby("地区")按地区进行分组，这会将数据按照华东、华北、华南、西南等地区划分为不同的组。',
                        '步骤2：使用agg()方法计算每个地区的销售总额、利润总额和订单数量，这三个指标是评估地区销售表现的核心指标。',
                        '步骤3：在分组结果上添加新的列"利润率"，计算公式为"利润总额/销售总额*100"，使用.round(2)保留两位小数。',
                        '步骤4：使用print()输出最终的统计结果，这样可以直观地看到各地区的销售表现对比，找出表现最好和最差的地区。'
                    ],
                    code: `# TODO: 按地区分组统计
print("\\n=== 按地区分组统计 ===")

# 按地区分组，计算销售总额和利润率
region_stats = data.groupby('地区').agg(
    销售总额=('销售额', 'sum'),
    利润总额=('利润', 'sum'),
    订单数量=('订单号', 'count')
)

# 添加利润率列
region_stats['利润率'] = (region_stats['利润总额'] / region_stats['销售总额'] * 100).round(2)

print(region_stats)`,
                    answer: `print("\\n=== 按地区分组统计 ===")

region_stats = data.groupby('地区').agg(
    销售总额=('销售额', 'sum'),
    利润总额=('利润', 'sum'),
    订单数量=('订单号', 'count')
)

region_stats['利润率'] = (region_stats['利润总额'] / region_stats['销售总额'] * 100).round(2)

print(region_stats)`,
                    expected: '显示各地区的销售总额、利润总额、订单数量和利润率',
                    commonErrors: [
                        '错误1：计算利润率时忘记乘以100，导致结果是小数而不是百分比',
                        '错误2：除法运算时可能出现除以零的情况，需要确保销售总额不为零',
                        '错误3：忘记使用.round(2)保留小数，导致利润率显示很多位小数',
                        '错误4：在分组结果上添加新列时列名拼写错误，导致无法正常显示'
                    ]
                },
                {
                    title: '任务3：多级分组分析',
                    objective: '按地区和产品类别进行多级分组',
                    hint: '使用groupby()传入多个列名进行多级分组',
                    steps: [
                        '步骤1：使用data.groupby(["地区", "产品类别"])进行多级分组，传入一个包含多个列名的列表，实现先按地区再按产品类别的嵌套分组。',
                        '步骤2：在多级分组上使用.agg()方法进行聚合计算，计算每个(地区, 产品类别)组合的销售总额和利润总额，这可以发现细分市场的表现。',
                        '步骤3：使用.round(2)保留两位小数，然后使用print()输出多级分组的完整结果，可以看到地区和产品类别的交叉分析。',
                        '步骤4：使用.loc["华东"]从多级索引中提取特定地区的数据，这样可以更深入地分析某个具体地区的产品类别分布。'
                    ],
                    code: `# TODO: 多级分组分析
print("\\n=== 按地区和产品类别多级分组 ===")

# 按地区和产品类别进行多级分组
multi_group = data.groupby(['地区', '产品类别']).agg(
    销售总额=('销售额', 'sum'),
    利润总额=('利润', 'sum')
).round(2)

print(multi_group)

# 查看特定地区的销售情况
print("\\n=== 华东地区各产品类别销售 ===")
print(multi_group.loc['华东'])`,
                    answer: `print("\\n=== 按地区和产品类别多级分组 ===")

multi_group = data.groupby(['地区', '产品类别']).agg(
    销售总额=('销售额', 'sum'),
    利润总额=('利润', 'sum')
).round(2)

print(multi_group)

print("\\n=== 华东地区各产品类别销售 ===")
print(multi_group.loc['华东'])`,
                    expected: '显示地区和产品类别的多级分组统计，以及华东地区的详细数据',
                    commonErrors: [
                        '错误1：多级分组时列名列表写错，比如把中括号写成小括号，或者列名拼写错误',
                        '错误2：使用.loc访问多级索引时忘记第一层索引，直接访问第二层会报错',
                        '错误3：多级分组的结果索引是MultiIndex，访问方式与普通索引不同，需要特别注意',
                        '错误4：多级分组后结果可能比较复杂，忘记使用print()查看完整结构就开始分析'
                    ]
                },
                {
                    title: '任务4：使用透视表分析',
                    objective: '创建透视表展示销售数据',
                    hint: '使用pivot_table()创建透视表',
                    steps: [
                        '步骤1：使用pd.pivot_table()创建透视表，这是Excel透视表的Pandas实现，可以快速汇总和展示多维度数据。',
                        '步骤2：设置index="地区"指定行维度为地区，columns="产品类别"指定列维度为产品类别，values="销售额"指定需要汇总的值。',
                        '步骤3：设置aggfunc="sum"使用求和函数进行聚合，fill_value=0将缺失值填充为0，这样表格看起来更整洁。',
                        '步骤4：设置margins=True和margins_name="总计"添加行和列的总计，这样可以看到整体的销售情况，然后使用print()输出透视表。'
                    ],
                    code: `# TODO: 使用透视表分析
print("\\n=== 销售数据透视表 ===")

# 创建透视表，行为地区，列为产品类别，值为销售额
pivot = pd.pivot_table(
    data,
    index='地区',
    columns='产品类别',
    values='销售额',
    aggfunc='sum',
    fill_value=0,
    margins=True,
    margins_name='总计'
)

print(pivot)`,
                    answer: `print("\\n=== 销售数据透视表 ===")

pivot = pd.pivot_table(
    data,
    index='地区',
    columns='产品类别',
    values='销售额',
    aggfunc='sum',
    fill_value=0,
    margins=True,
    margins_name='总计'
)

print(pivot)`,
                    expected: '显示地区和产品类别的透视表，包含总计行和列',
                    commonErrors: [
                        '错误1：忘记在pivot_table()中指定aggfunc，默认可能使用mean而不是sum，导致结果不符合预期',
                        '错误2：margins=True时忘记指定margins_name，默认会显示"All"，不够美观',
                        '错误3：index或columns参数写错列名，导致透视表创建失败',
                        '错误4：fill_value设置错误，导致缺失值显示为NaN而不是0，影响阅读'
                    ]
                }
            ],
            completeCode: `import pandas as pd

# 创建模拟销售数据
data = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005', 'ORD006', 'ORD007', 'ORD008', 'ORD009', 'ORD010'],
    '客户ID': ['C001', 'C002', 'C003', 'C004', 'C005', 'C006', 'C007', 'C008', 'C009', 'C010'],
    '地区': ['华东', '华北', '华南', '西南', '华东', '华北', '华南', '西南', '华东', '华北'],
    '产品类别': ['电子产品', '办公用品', '家具', '电子产品', '办公用品', '家具', '电子产品', '办公用品', '家具', '电子产品'],
    '销售额': [15800, 3200, 8500, 22500, 19800, 15000, 7200, 4500, 12800, 28900],
    '利润': [3160, 640, 1700, 4500, 3960, 3000, 1440, 900, 2560, 5780],
    '下单日期': ['2024-01-15', '2024-01-15', '2024-01-16', '2024-01-16', '2024-01-17', '2024-01-17', '2024-01-18', '2024-01-18', '2024-01-19', '2024-01-19']
})

print("=== 原始销售数据 ===")
print(data)

# 任务1：按产品类别分组统计
print("\\n=== 【任务1】按产品类别分组统计 ===")
category_stats = data.groupby('产品类别').agg(
    销售总额=('销售额', 'sum'),
    利润总额=('利润', 'sum'),
    订单数量=('订单号', 'count'),
    平均销售额=('销售额', 'mean')
).round(2)
print(category_stats)

# 任务2：按地区分组统计
print("\\n=== 【任务2】按地区分组统计 ===")
region_stats = data.groupby('地区').agg(
    销售总额=('销售额', 'sum'),
    利润总额=('利润', 'sum'),
    订单数量=('订单号', 'count')
)
region_stats['利润率'] = (region_stats['利润总额'] / region_stats['销售总额'] * 100).round(2)
print(region_stats)

# 任务3：多级分组分析
print("\\n=== 【任务3】多级分组分析 ===")
multi_group = data.groupby(['地区', '产品类别']).agg(
    销售总额=('销售额', 'sum'),
    利润总额=('利润', 'sum')
).round(2)
print(multi_group)

# 任务4：透视表分析
print("\\n=== 【任务4】透视表分析 ===")
pivot = pd.pivot_table(
    data,
    index='地区',
    columns='产品类别',
    values='销售额',
    aggfunc='sum',
    fill_value=0,
    margins=True,
    margins_name='总计'
)
print(pivot)`,
            summary: {
                keyPoints: [
                    'groupby()是Pandas中最强大的分组操作方法',
                    'agg()可以同时应用多个聚合函数',
                    '多级分组可以传入多个列名',
                    'pivot_table()是创建透视表的便捷方法',
                    '分组后可以继续进行数据筛选和计算'
                ],
                nextSteps: [
                    '学习groupby的transform()和filter()方法',
                    '掌握时间序列数据的分组分析',
                    '了解更复杂的聚合操作和自定义聚合函数'
                ]
            }
        }
    },
    {
        id: 'project3',
        title: '🛒 购物篮分析',
        description: '使用关联规则挖掘，发现商品之间的关联关系',
        difficulty: '高级',
        duration: '60分钟',
        detail: {
            overview: {
                title: '项目概览',
                difficulty: '高级',
                duration: '60分钟',
                objectives: [
                    '理解购物篮分析的基本概念',
                    '掌握Apriori算法原理',
                    '学会计算支持度、置信度、提升度',
                    '能够发现商品之间的关联规则',
                    '理解关联规则的实际应用场景'
                ]
            },
            background: '购物篮分析是数据挖掘中最经典的应用之一，通过分析顾客购买的商品组合，发现商品之间的关联关系。例如，发现购买牛奶的顾客有80%的概率同时购买面包，这可以帮助商家进行商品摆放优化、促销活动设计和推荐系统开发。某超市希望通过购物篮分析了解顾客的购买习惯，找出哪些商品经常一起被购买，以便制定更有效的营销策略。',
            dataset: {
                description: '模拟超市交易数据，包含交易ID和购买的商品列表。',
                fields: [
                    { name: '交易ID', type: 'int', desc: '交易唯一标识' },
                    { name: '商品', type: 'string', desc: '购买的商品名称' }
                ],
                code: `import pandas as pd

# 创建模拟购物篮数据
transactions = pd.DataFrame({
    '交易ID': [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 9, 9, 10, 10, 10],
    '商品': ['牛奶', '面包', '鸡蛋', '牛奶', '面包', '面包', '鸡蛋', '酸奶', '牛奶', '鸡蛋', '酸奶', '面包', '酸奶', '牛奶', '面包', '鸡蛋', '鸡蛋', '酸奶', '牛奶', '面包', '酸奶', '面包', '鸡蛋', '牛奶', '鸡蛋', '酸奶']
})

print("=== 购物篮数据 ===")
print(transactions)

# 将数据转换为交易列表格式
transaction_list = transactions.groupby('交易ID')['商品'].apply(list).tolist()
print("\\n=== 交易列表 ===")
for i, items in enumerate(transaction_list, 1):
    print(f"交易{i}: {items}")`
            },
            tasks: [
                {
                    title: '任务1：计算商品支持度',
                    objective: '计算每个商品的支持度（出现频率）',
                    hint: '支持度 = 包含该商品的交易数 / 总交易数',
                    steps: [
                        '步骤1：使用len(transaction_list)计算总交易数，这是计算支持度的分母，需要先统计清楚有多少笔交易。',
                        '步骤2：使用字典item_counts统计每个商品出现的交易数，遍历所有交易和其中的商品，使用get()方法安全地累加计数。',
                        '步骤3：创建DataFrame保存结果，包含商品名称、交易数和支持度，支持度计算公式为"交易数/总交易数"。',
                        '步骤4：使用sort_values("支持度", ascending=False)按支持度降序排列，这样可以直接看到哪些商品最受欢迎，然后使用print()输出结果。'
                    ],
                    code: `# TODO: 计算商品支持度
print("=== 商品支持度计算 ===")

# 计算总交易数
total_transactions = len(transaction_list)
print(f"总交易数: {total_transactions}")

# 计算每个商品的支持度
item_counts = {}
for transaction in transaction_list:
    for item in transaction:
        item_counts[item] = item_counts.get(item, 0) + 1

support_df = pd.DataFrame({
    '商品': list(item_counts.keys()),
    '交易数': list(item_counts.values()),
    '支持度': [count / total_transactions for count in item_counts.values()]
}).sort_values('支持度', ascending=False)

print(support_df)`,
                    answer: `print("=== 商品支持度计算 ===")

total_transactions = len(transaction_list)
print(f"总交易数: {total_transactions}")

item_counts = {}
for transaction in transaction_list:
    for item in transaction:
        item_counts[item] = item_counts.get(item, 0) + 1

support_df = pd.DataFrame({
    '商品': list(item_counts.keys()),
    '交易数': list(item_counts.values()),
    '支持度': [count / total_transactions for count in item_counts.values()]
}).sort_values('支持度', ascending=False)

print(support_df)`,
                    expected: '显示每个商品的交易数和支持度，按支持度降序排列',
                    commonErrors: [
                        '错误1：统计商品交易数时没有去重，导致同一个商品在一笔交易中被多次计数',
                        '错误2：忘记使用sorted()排序，或者排序方向错误，导致结果不够直观',
                        '错误3：字典的get()方法使用错误，比如默认值不是0而是其他值',
                        '错误4：支持度计算公式写反，比如写成"总交易数/交易数"，导致结果大于1'
                    ]
                },
                {
                    title: '任务2：计算商品组合支持度',
                    objective: '计算商品组合的支持度',
                    hint: '从交易列表中生成所有商品组合，计算每个组合的支持度',
                    steps: [
                        '步骤1：使用from itertools import combinations导入组合生成函数，这是Python标准库中的工具，用于生成所有可能的商品组合。',
                        '步骤2：使用字典pair_counts统计每个2-item商品组合的出现次数，对每笔交易使用combinations(sorted(transaction), 2)生成所有两两组合。',
                        '步骤3：创建DataFrame保存结果，将商品组合格式化为"牛奶→面包"这样的友好显示方式，计算每个组合的支持度。',
                        '步骤4：使用sort_values("支持度", ascending=False)按支持度降序排列，这样可以直接看到哪些商品组合最常一起购买。'
                    ],
                    code: `# TODO: 计算商品组合支持度
from itertools import combinations

print("\\n=== 商品组合支持度 ===")

# 生成所有2-item组合
pair_counts = {}
for transaction in transaction_list:
    for pair in combinations(sorted(transaction), 2):
        pair_counts[pair] = pair_counts.get(pair, 0) + 1

pair_support = pd.DataFrame({
    '商品组合': [f"{a} → {b}" for a, b in pair_counts.keys()],
    '交易数': list(pair_counts.values()),
    '支持度': [count / total_transactions for count in pair_counts.values()]
}).sort_values('支持度', ascending=False)

print(pair_support)`,
                    answer: `from itertools import combinations

print("\\n=== 商品组合支持度 ===")

pair_counts = {}
for transaction in transaction_list:
    for pair in combinations(sorted(transaction), 2):
        pair_counts[pair] = pair_counts.get(pair, 0) + 1

pair_support = pd.DataFrame({
    '商品组合': [f"{a} → {b}" for a, b in pair_counts.keys()],
    '交易数': list(pair_counts.values()),
    '支持度': [count / total_transactions for count in pair_counts.values()]
}).sort_values('支持度', ascending=False)

print(pair_support)`,
                    expected: '显示所有商品组合的交易数和支持度',
                    commonErrors: [
                        '错误1：忘记使用sorted(transaction)，导致"牛奶,面包"和"面包,牛奶"被算作两个不同的组合',
                        '错误2：combinations函数的第二个参数不是2，导致生成3个或更多商品的组合，而不是两两组合',
                        '错误3：忘记导入combinations，直接使用会报NameError错误',
                        '错误4：组合的键没有用元组，导致字典无法正确存储，使用列表作为键会报错'
                    ]
                },
                {
                    title: '任务3：计算置信度和提升度',
                    objective: '计算关联规则的置信度和提升度',
                    hint: '置信度 = 支持度(A→B) / 支持度(A)；提升度 = 置信度(A→B) / 支持度(B)',
                    steps: [
                        '步骤1：创建一个空列表rules用于存储所有关联规则，我们会遍历所有商品组合，为每个组合计算指标并添加到列表中。',
                        '步骤2：遍历pair_counts.items()，对每个商品组合(item_a, item_b)，计算支持度support_ab = count_ab/total_transactions，以及单个商品的支持度support_a和support_b。',
                        '步骤3：计算置信度confidence = support_ab/support_a，表示购买A的条件下购买B的概率；计算提升度lift = confidence/support_b，表示购买A对购买B的提升效果。',
                        '步骤4：将每个规则的信息添加到列表中，包括规则描述、支持度、置信度和提升度，创建DataFrame后按提升度降序排列并输出。'
                    ],
                    code: `# TODO: 计算置信度和提升度
print("\\n=== 关联规则分析 ===")

rules = []
for (item_a, item_b), count_ab in pair_counts.items():
    support_ab = count_ab / total_transactions
    support_a = item_counts[item_a] / total_transactions
    support_b = item_counts[item_b] / total_transactions
    
    # 置信度: P(B|A) = support(A,B) / support(A)
    confidence = support_ab / support_a
    
    # 提升度: confidence / support(B)
    lift = confidence / support_b
    
    rules.append({
        '规则': f"{item_a} → {item_b}",
        '支持度': round(support_ab, 3),
        '置信度': round(confidence, 3),
        '提升度': round(lift, 3)
    })

rules_df = pd.DataFrame(rules).sort_values('提升度', ascending=False)
print(rules_df)`,
                    answer: `print("\\n=== 关联规则分析 ===")

rules = []
for (item_a, item_b), count_ab in pair_counts.items():
    support_ab = count_ab / total_transactions
    support_a = item_counts[item_a] / total_transactions
    support_b = item_counts[item_b] / total_transactions
    
    confidence = support_ab / support_a
    lift = confidence / support_b
    
    rules.append({
        '规则': f"{item_a} → {item_b}",
        '支持度': round(support_ab, 3),
        '置信度': round(confidence, 3),
        '提升度': round(lift, 3)
    })

rules_df = pd.DataFrame(rules).sort_values('提升度', ascending=False)
print(rules_df)`,
                    expected: '显示所有关联规则的支持度、置信度和提升度，按提升度降序排列',
                    commonErrors: [
                        '错误1：置信度计算公式写错，比如写成support_a/support_ab，导致结果和预期相反',
                        '错误2：提升度计算公式错误，比如写成confidence*support_b而不是confidence/support_b',
                        '错误3：忘记使用round()保留小数位，导致结果显示过多位小数，不够美观',
                        '错误4：没有按提升度排序，导致最重要的规则（提升度最高）没有显示在最前面'
                    ]
                },
                {
                    title: '任务4：筛选有效关联规则',
                    objective: '根据阈值筛选有意义的关联规则',
                    hint: '设置最小支持度、最小置信度和最小提升度阈值',
                    steps: [
                        '步骤1：设置三个关键阈值，最小支持度min_support=0.2、最小置信度min_confidence=0.5、最小提升度min_lift=1.0，这些阈值需要根据业务场景调整。',
                        '步骤2：使用布尔索引筛选规则，同时满足三个条件：支持度≥min_support、置信度≥min_confidence、提升度>min_lift，条件之间用&连接且每个条件用括号包裹。',
                        '步骤3：提升度>1表示商品A和B有正相关关系，=1表示无关，<1表示负相关，所以我们只保留提升度>1的规则，这是最关键的筛选条件。',
                        '步骤4：打印筛选条件、有效规则数量和具体规则列表，这样可以直观地看到哪些商品组合是真正有商业价值的。'
                    ],
                    code: `# TODO: 筛选有效关联规则
print("\\n=== 筛选有效关联规则 ===")

# 设置阈值
min_support = 0.2
min_confidence = 0.5
min_lift = 1.0

# 筛选规则
valid_rules = rules_df[
    (rules_df['支持度'] >= min_support) &
    (rules_df['置信度'] >= min_confidence) &
    (rules_df['提升度'] > min_lift)
]

print(f"筛选条件: 支持度≥{min_support}, 置信度≥{min_confidence}, 提升度>{min_lift}")
print(f"有效规则数: {len(valid_rules)}")
print(valid_rules)`,
                    answer: `print("\\n=== 筛选有效关联规则 ===")

min_support = 0.2
min_confidence = 0.5
min_lift = 1.0

valid_rules = rules_df[
    (rules_df['支持度'] >= min_support) &
    (rules_df['置信度'] >= min_confidence) &
    (rules_df['提升度'] > min_lift)
]

print(f"筛选条件: 支持度≥{min_support}, 置信度≥{min_confidence}, 提升度>{min_lift}")
print(f"有效规则数: {len(valid_rules)}")
print(valid_rules)`,
                    expected: '显示满足阈值条件的有效关联规则',
                    commonErrors: [
                        '错误1：使用|而不是&连接条件，导致筛选出满足任一条件而不是所有条件的规则',
                        '错误2：忘记给每个条件加括号，导致运算优先级错误，筛选结果不正确',
                        '错误3：min_lift设置为>=1.0而不是>1.0，导致保留了没有提升效果的无关规则',
                        '错误4：阈值设置不合理，比如min_support太高导致没有任何规则被筛选出来'
                    ]
                }
            ],
            completeCode: `import pandas as pd
from itertools import combinations

# 创建模拟购物篮数据
transactions = pd.DataFrame({
    '交易ID': [1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 9, 9, 10, 10, 10],
    '商品': ['牛奶', '面包', '鸡蛋', '牛奶', '面包', '面包', '鸡蛋', '酸奶', '牛奶', '鸡蛋', '酸奶', '面包', '酸奶', '牛奶', '面包', '鸡蛋', '鸡蛋', '酸奶', '牛奶', '面包', '酸奶', '面包', '鸡蛋', '牛奶', '鸡蛋', '酸奶']
})

print("=== 购物篮数据 ===")
print(transactions)

# 转换为交易列表
transaction_list = transactions.groupby('交易ID')['商品'].apply(list).tolist()
total_transactions = len(transaction_list)

# 任务1：计算商品支持度
print("\\n=== 【任务1】商品支持度 ===")
item_counts = {}
for transaction in transaction_list:
    for item in transaction:
        item_counts[item] = item_counts.get(item, 0) + 1

support_df = pd.DataFrame({
    '商品': list(item_counts.keys()),
    '交易数': list(item_counts.values()),
    '支持度': [count / total_transactions for count in item_counts.values()]
}).sort_values('支持度', ascending=False)
print(support_df)

# 任务2：计算商品组合支持度
print("\\n=== 【任务2】商品组合支持度 ===")
pair_counts = {}
for transaction in transaction_list:
    for pair in combinations(sorted(transaction), 2):
        pair_counts[pair] = pair_counts.get(pair, 0) + 1

pair_support = pd.DataFrame({
    '商品组合': [f"{a} → {b}" for a, b in pair_counts.keys()],
    '交易数': list(pair_counts.values()),
    '支持度': [count / total_transactions for count in pair_counts.values()]
}).sort_values('支持度', ascending=False)
print(pair_support)

# 任务3：计算置信度和提升度
print("\\n=== 【任务3】关联规则分析 ===")
rules = []
for (item_a, item_b), count_ab in pair_counts.items():
    support_ab = count_ab / total_transactions
    support_a = item_counts[item_a] / total_transactions
    support_b = item_counts[item_b] / total_transactions
    confidence = support_ab / support_a
    lift = confidence / support_b
    
    rules.append({
        '规则': f"{item_a} → {item_b}",
        '支持度': round(support_ab, 3),
        '置信度': round(confidence, 3),
        '提升度': round(lift, 3)
    })

rules_df = pd.DataFrame(rules).sort_values('提升度', ascending=False)
print(rules_df)

# 任务4：筛选有效关联规则
print("\\n=== 【任务4】筛选有效规则 ===")
valid_rules = rules_df[
    (rules_df['支持度'] >= 0.2) &
    (rules_df['置信度'] >= 0.5) &
    (rules_df['提升度'] > 1.0)
]
print(valid_rules)`,
            summary: {
                keyPoints: [
                    '支持度：商品组合出现的频率',
                    '置信度：规则的可靠程度',
                    '提升度：规则的有效性（大于1表示正相关）',
                    '关联规则挖掘可以发现商品之间的隐藏关系',
                    '需要设置合理的阈值来筛选有意义的规则'
                ],
                nextSteps: [
                    '学习Apriori算法的优化实现',
                    '了解FP-Growth算法',
                    '尝试使用mlxtend库进行关联规则挖掘',
                    '将关联规则应用到推荐系统中'
                ]
            }
        }
    },
    {
        id: 'project4',
        title: '👥 客户聚类分析',
        description: '使用聚类算法对客户进行分组分析，识别客户特征',
        difficulty: '高级',
        duration: '60分钟',
        detail: {
            overview: {
                title: '项目概览',
                difficulty: '高级',
                duration: '60分钟',
                objectives: [
                    '理解聚类分析的基本概念',
                    '掌握K-Means聚类算法',
                    '学会选择合适的聚类数量',
                    '能对聚类结果进行可视化分析',
                    '理解客户分群的业务意义'
                ]
            },
            background: '客户聚类分析是客户细分的重要方法。通过聚类分析，可以将客户分为不同的群体，每个群体具有相似的特征和行为模式。这有助于企业了解不同客户群体的需求，制定差异化的营销策略，提高客户满意度和忠诚度。',
            dataset: {
                description: '模拟客户数据，包含客户ID、年龄、性别、消费金额、购买频次、平均客单价等字段。',
                fields: [
                    { name: '客户ID', type: 'string', desc: '客户唯一标识' },
                    { name: '年龄', type: 'int', desc: '客户年龄' },
                    { name: '性别', type: 'string', desc: '男/女' },
                    { name: '消费金额', type: 'float', desc: '累计消费金额' },
                    { name: '购买频次', type: 'int', desc: '购买次数' },
                    { name: '平均客单价', type: 'float', desc: '平均每次消费金额' }
                ],
                code: `import pandas as pd

# 创建模拟客户数据
customers = pd.DataFrame({
    '客户ID': ['C001', 'C002', 'C003', 'C004', 'C005', 'C006', 'C007', 'C008', 'C009', 'C010'],
    '年龄': [25, 32, 45, 28, 55, 38, 22, 41, 35, 29],
    '性别': ['男', '女', '男', '女', '男', '女', '男', '女', '男', '女'],
    '消费金额': [5800, 12500, 8900, 25600, 6200, 18900, 3200, 22300, 9800, 15600],
    '购买频次': [5, 12, 8, 20, 6, 15, 3, 18, 9, 11],
    '平均客单价': [1160, 1042, 1113, 1280, 1033, 1260, 1067, 1239, 1089, 1418]
})

print("=== 客户数据 ===")
print(customers)`
            },
            tasks: [
                {
                    title: '任务1：数据标准化',
                    objective: '对数值型数据进行标准化处理',
                    hint: '使用StandardScaler进行数据标准化',
                    steps: [
                        '步骤1：从sklearn.preprocessing导入StandardScaler，这是scikit-learn库中专门用于数据标准化的工具，会将数据转换为均值为0、标准差为1的分布。',
                        '步骤2：选择需要聚类的数值型特征，这里我们选择年龄、消费金额、购买频次和平均客单价这四个能体现客户特征的维度。',
                        '步骤3：创建StandardScaler对象，使用fit_transform()方法先学习数据的统计特征（均值和标准差），然后对数据进行标准化转换。',
                        '步骤4：将标准化后的numpy数组转换回DataFrame，保持原有的列名，这样可以更清晰地查看标准化后的结果。'
                    ],
                    code: `# TODO: 数据标准化
from sklearn.preprocessing import StandardScaler

# 选择数值型特征
features = customers[['年龄', '消费金额', '购买频次', '平均客单价']]

# 创建标准化器并拟合
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# 转换为DataFrame
scaled_df = pd.DataFrame(scaled_features, columns=features.columns)
print("标准化后的数据:")
print(scaled_df.head())`,
                    answer: `from sklearn.preprocessing import StandardScaler

features = customers[['年龄', '消费金额', '购买频次', '平均客单价']]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)
scaled_df = pd.DataFrame(scaled_features, columns=features.columns)
print(scaled_df.head())`,
                    expected: '显示标准化后的数据，均值为0，标准差为1',
                    commonErrors: [
                        '错误1：忘记先标准化数据就直接进行聚类，导致不同量级的特征（如消费金额和购买频次）权重不均衡',
                        '错误2：只使用transform()而不是fit_transform()，导致scaler没有学习数据的统计特征',
                        '错误3：在选择特征时包含了非数值型字段（如性别），导致StandardScaler报错',
                        '错误4：没有将结果转换回DataFrame，直接查看numpy数组，不够直观'
                    ]
                },
                {
                    title: '任务2：使用K-Means聚类',
                    objective: '对客户数据进行K-Means聚类',
                    hint: '使用KMeans类进行聚类，设置n_clusters参数',
                    steps: [
                        '步骤1：从sklearn.cluster导入KMeans类，这是scikit-learn中最常用的聚类算法，通过最小化簇内距离将数据划分为指定数量的簇。',
                        '步骤2：创建KMeans对象，设置n_clusters=3表示我们想将客户分为3个群体，random_state=42保证每次运行结果一致便于调试。',
                        '步骤3：使用fit_predict()方法，先在标准化后的数据上训练模型，然后直接返回每个样本的聚类标签，将标签添加到原DataFrame的新列中。',
                        '步骤4：打印每个客户的ID、消费金额和对应的聚类标签，这样可以初步观察不同聚类的客户有什么特征差异。'
                    ],
                    code: `# TODO: 使用K-Means聚类
from sklearn.cluster import KMeans

# 创建K-Means模型，设置聚类数量为3
kmeans = KMeans(n_clusters=3, random_state=42)
customers['聚类标签'] = kmeans.fit_predict(scaled_features)

print("聚类结果:")
print(customers[['客户ID', '消费金额', '聚类标签']])`,
                    answer: `from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=3, random_state=42)
customers['聚类标签'] = kmeans.fit_predict(scaled_features)
print(customers[['客户ID', '消费金额', '聚类标签']])`,
                    expected: '显示每个客户的聚类标签（0、1或2）',
                    commonErrors: [
                        '错误1：使用原始数据而不是标准化后的数据进行聚类，导致消费金额等量级大的特征主导聚类结果',
                        '错误2：n_clusters设置不合理，比如设为1或超过样本数，导致聚类没有意义或报错',
                        '错误3：忘记设置random_state，导致每次运行结果都不一样，无法复现和调试',
                        '错误4：没有将聚类标签添加到原DataFrame，后续分析时不知道哪个客户属于哪个簇'
                    ]
                },
                {
                    title: '任务3：分析聚类结果',
                    objective: '分析每个聚类的特征',
                    hint: '使用groupby按聚类标签分组统计',
                    steps: [
                        '步骤1：使用groupby('聚类标签')将客户按聚类结果分组，这是分析每个群体特征的关键操作，我们需要对比不同群体的差异。',
                        '步骤2：使用agg()方法对每个分组进行聚合统计，计算客户数（count）、平均年龄（mean）、平均消费（mean）、平均频次（mean）和平均客单价（mean），这五个指标能很好地描述客户群体。',
                        '步骤3：使用round(2)将结果保留两位小数，让统计结果更整洁易读，避免显示过多的小数位。',
                        '步骤4：打印聚类分析结果表格，这样可以直观地看到每个聚类的特征，比如哪个群体消费最高、哪个群体购买最频繁等。'
                    ],
                    code: `# TODO: 分析聚类结果
cluster_analysis = customers.groupby('聚类标签').agg(
    客户数=('客户ID', 'count'),
    平均年龄=('年龄', 'mean'),
    平均消费=('消费金额', 'mean'),
    平均频次=('购买频次', 'mean'),
    平均客单价=('平均客单价', 'mean')
).round(2)

print("=== 聚类分析结果 ===")
print(cluster_analysis)`,
                    answer: `cluster_analysis = customers.groupby('聚类标签').agg(
    客户数=('客户ID', 'count'),
    平均年龄=('年龄', 'mean'),
    平均消费=('消费金额', 'mean'),
    平均频次=('购买频次', 'mean'),
    平均客单价=('平均客单价', 'mean')
).round(2)

print("=== 聚类分析结果 ===")
print(cluster_analysis)`,
                    expected: '显示每个聚类的统计特征',
                    commonErrors: [
                        '错误1：在groupby中使用了错误的列名，比如把'聚类标签'写成了其他名称',
                        '错误2：agg()函数中的元组格式错误，应该是(新列名, 聚合函数)的形式',
                        '错误3：聚合函数名写错，比如把mean写成了average',
                        '错误4：没有使用round()保留小数，导致结果显示过多位小数，不够专业'
                    ]
                },
                {
                    title: '任务4：可视化聚类结果',
                    objective: '使用散点图展示聚类结果',
                    hint: '使用matplotlib绘制散点图，不同聚类用不同颜色',
                    steps: [
                        '步骤1：导入matplotlib.pyplot库并简称为plt，这是Python中最常用的数据可视化工具，可以快速绘制各种类型的图表。',
                        '步骤2：创建一个大小为(10,6)的画布，这样可以让图表更宽敞美观，设置颜色列表['red', 'green', 'blue']用于区分三个聚类。',
                        '步骤3：使用for循环遍历每个聚类（0、1、2），筛选出属于该聚类的客户数据，然后用散点图scatter()绘制，x轴用消费金额，y轴用购买频次。',
                        '步骤4：设置x轴标签、y轴标签和图表标题，添加图例legend()显示每个颜色对应的聚类，最后用show()显示图表，这样可以直观地看到聚类效果。'
                    ],
                    code: `# TODO: 可视化聚类结果
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))
colors = ['red', 'green', 'blue']

for cluster in range(3):
    cluster_data = customers[customers['聚类标签'] == cluster]
    plt.scatter(cluster_data['消费金额'], cluster_data['购买频次'], 
                color=colors[cluster], label=f'聚类{cluster}', s=100)

plt.xlabel('消费金额')
plt.ylabel('购买频次')
plt.title('客户聚类结果可视化')
plt.legend()
plt.show()`,
                    answer: `import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))
colors = ['red', 'green', 'blue']

for cluster in range(3):
    cluster_data = customers[customers['聚类标签'] == cluster]
    plt.scatter(cluster_data['消费金额'], cluster_data['购买频次'], 
                color=colors[cluster], label=f'聚类{cluster}', s=100)

plt.xlabel('消费金额')
plt.ylabel('购买频次')
plt.title('客户聚类结果可视化')
plt.legend()
plt.show()`,
                    expected: '显示聚类结果的散点图',
                    commonErrors: [
                        '错误1：忘记导入matplotlib.pyplot，导致plt未定义报错',
                        '错误2：颜色列表colors的长度与聚类数量不一致，导致索引越界',
                        '错误3：scatter()的x轴或y轴列名写错，导致KeyError',
                        '错误4：忘记调用plt.show()，导致图表生成但不显示'
                    ]
                }
            ],
            completeCode: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# 创建模拟客户数据
customers = pd.DataFrame({
    '客户ID': ['C001', 'C002', 'C003', 'C004', 'C005', 'C006', 'C007', 'C008', 'C009', 'C010'],
    '年龄': [25, 32, 45, 28, 55, 38, 22, 41, 35, 29],
    '性别': ['男', '女', '男', '女', '男', '女', '男', '女', '男', '女'],
    '消费金额': [5800, 12500, 8900, 25600, 6200, 18900, 3200, 22300, 9800, 15600],
    '购买频次': [5, 12, 8, 20, 6, 15, 3, 18, 9, 11],
    '平均客单价': [1160, 1042, 1113, 1280, 1033, 1260, 1067, 1239, 1089, 1418]
})

# 数据标准化
features = customers[['年龄', '消费金额', '购买频次', '平均客单价']]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# K-Means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
customers['聚类标签'] = kmeans.fit_predict(scaled_features)

# 分析聚类结果
cluster_analysis = customers.groupby('聚类标签').agg(
    客户数=('客户ID', 'count'),
    平均年龄=('年龄', 'mean'),
    平均消费=('消费金额', 'mean'),
    平均频次=('购买频次', 'mean'),
    平均客单价=('平均客单价', 'mean')
).round(2)

print("=== 客户聚类分析结果 ===")
print(cluster_analysis)`,
            summary: {
                keyPoints: ['K-Means是常用的聚类算法', '数据标准化对聚类结果影响很大', '需要选择合适的聚类数量K', '聚类结果需要结合业务理解'],
                nextSteps: ['学习肘部法则选择K值', '尝试其他聚类算法如DBSCAN', '学习层次聚类', '将聚类结果应用到推荐系统']
            }
        }
    },
    {
        id: 'project5',
        title: '📈 数据可视化',
        description: '使用Matplotlib和Seaborn创建专业的数据可视化图表',
        difficulty: '进阶',
        duration: '60分钟',
        detail: {
            overview: {
                title: '项目概览',
                difficulty: '进阶',
                duration: '60分钟',
                objectives: [
                    '掌握Matplotlib基础绘图',
                    '学会使用Seaborn创建统计图表',
                    '能创建多种类型的图表',
                    '理解图表设计原则',
                    '学会美化图表'
                ]
            },
            background: '数据可视化是数据分析的重要组成部分，通过图表可以直观地展示数据特征和趋势。好的可视化能够帮助业务人员快速理解数据，发现数据中的模式和异常。',
            dataset: {
                description: '模拟销售数据，包含月份、销售额、利润、产品类别等字段。',
                fields: [
                    { name: '月份', type: 'string', desc: '月份名称' },
                    { name: '销售额', type: 'float', desc: '销售金额' },
                    { name: '利润', type: 'float', desc: '利润金额' },
                    { name: '订单数', type: 'int', desc: '订单数量' }
                ],
                code: `import pandas as pd

# 创建模拟销售数据
sales_data = pd.DataFrame({
    '月份': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    '销售额': [12000, 15000, 18000, 16000, 20000, 22000, 25000, 23000, 21000, 24000, 28000, 35000],
    '利润': [2400, 3000, 3600, 3200, 4000, 4400, 5000, 4600, 4200, 4800, 5600, 7000],
    '订单数': [120, 150, 180, 160, 200, 220, 250, 230, 210, 240, 280, 350]
})

print("=== 销售数据 ===")
print(sales_data)`
            },
            tasks: [
                {
                    title: '任务1：创建折线图',
                    objective: '绘制销售额趋势折线图',
                    hint: '使用plt.plot()绘制折线图',
                    steps: [
                        '步骤1：导入matplotlib.pyplot库并简称为plt，这是Python中最常用的可视化工具，专门用于创建各种统计图表。',
                        '步骤2：创建一个尺寸为(12,6)的画布，宽度12英寸、高度6英寸，这样的宽高比适合展示时间序列数据。',
                        '步骤3：使用plt.plot()绘制折线图，x轴是月份，y轴是销售额，设置marker='o'显示圆点数据点，linestyle='-'用实线连接，color='blue'设置蓝色，这样的组合清晰美观。',
                        '步骤4：添加图表标题“月度销售额趋势”、x轴标签“月份”、y轴标签“销售额”，使用plt.grid(True)添加网格线便于读数，最后用plt.show()显示图表。'
                    ],
                    code: `# TODO: 创建折线图
import matplotlib.pyplot as plt

plt.figure(figsize=(12, 6))
plt.plot(sales_data['月份'], sales_data['销售额'], marker='o', linestyle='-', color='blue')
plt.title('月度销售额趋势')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.grid(True)
plt.show()`,
                    answer: `import matplotlib.pyplot as plt

plt.figure(figsize=(12, 6))
plt.plot(sales_data['月份'], sales_data['销售额'], marker='o', linestyle='-', color='blue')
plt.title('月度销售额趋势')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.grid(True)
plt.show()`,
                    expected: '显示月度销售额趋势折线图',
                    commonErrors: [
                        '错误1：忘记导入matplotlib.pyplot，导致plt未定义报错',
                        '错误2：列名拼写错误，比如把'月份'写成了'月'，导致KeyError',
                        '错误3：参数名写错，比如把marker写成了markers',
                        '错误4：忘记调用plt.show()，导致图表生成但不显示'
                    ]
                },
                {
                    title: '任务2：创建柱状图',
                    objective: '绘制各月份销售额柱状图',
                    hint: '使用plt.bar()绘制柱状图',
                    steps: [
                        '步骤1：创建一个尺寸为(12,6)的画布，适合展示12个月份的数据对比，宽度足够容纳所有月份标签。',
                        '步骤2：使用plt.bar()绘制柱状图，x轴是月份，y轴是销售额，设置color='skyblue'为天蓝色，使图表清新美观。',
                        '步骤3：添加图表标题“月度销售额对比”、x轴标签“月份”、y轴标签“销售额”，让图表信息完整。',
                        '步骤4：调用plt.show()显示图表，这样可以直观地对比每个月份的销售额高低。'
                    ],
                    code: `# TODO: 创建柱状图
plt.figure(figsize=(12, 6))
plt.bar(sales_data['月份'], sales_data['销售额'], color='skyblue')
plt.title('月度销售额对比')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.show()`,
                    answer: `plt.figure(figsize=(12, 6))
plt.bar(sales_data['月份'], sales_data['销售额'], color='skyblue')
plt.title('月度销售额对比')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.show()`,
                    expected: '显示月度销售额柱状图',
                    commonErrors: [
                        '错误1：柱状图宽度设置不合理，导致柱子太宽或太窄，影响视觉效果',
                        '错误2：颜色选择不当，比如使用过于刺眼或难以区分的颜色',
                        '错误3：忘记添加标签，导致图表难以理解',
                        '错误4：没有调整画布大小，导致月份标签重叠'
                    ]
                },
                {
                    title: '任务3：创建多系列图表',
                    objective: '在同一图表中显示销售额和利润',
                    hint: '使用双Y轴或多条折线',
                    steps: [
                        '步骤1：使用plt.subplots()创建画布和第一个轴ax1，尺寸为(12,6)，这样可以同时显示两个不同量级的数据。',
                        '步骤2：在ax1上绘制销售额折线，使用蓝色(b-)和圆形标记(marker='o')，设置x轴标签和y轴标签，y轴标签颜色与折线一致。',
                        '步骤3：使用ax1.twinx()创建共享x轴的第二个轴ax2，这是实现双Y轴的关键步骤，用于显示利润数据。',
                        '步骤4：在ax2上绘制利润折线，使用红色(r-)和方形标记(marker='s')，设置y轴标签颜色为红色，添加图例和标题后显示图表。'
                    ],
                    code: `# TODO: 创建多系列图表
fig, ax1 = plt.subplots(figsize=(12, 6))

ax1.plot(sales_data['月份'], sales_data['销售额'], 'b-', marker='o', label='销售额')
ax1.set_xlabel('月份')
ax1.set_ylabel('销售额', color='b')

ax2 = ax1.twinx()
ax2.plot(sales_data['月份'], sales_data['利润'], 'r-', marker='s', label='利润')
ax2.set_ylabel('利润', color='r')

plt.title('销售额与利润趋势')
fig.legend(loc='upper left')
plt.show()`,
                    answer: `fig, ax1 = plt.subplots(figsize=(12, 6))

ax1.plot(sales_data['月份'], sales_data['销售额'], 'b-', marker='o', label='销售额')
ax1.set_xlabel('月份')
ax1.set_ylabel('销售额', color='b')

ax2 = ax1.twinx()
ax2.plot(sales_data['月份'], sales_data['利润'], 'r-', marker='s', label='利润')
ax2.set_ylabel('利润', color='r')

plt.title('销售额与利润趋势')
fig.legend(loc='upper left')
plt.show()`,
                    expected: '显示双Y轴图表，同时展示销售额和利润',
                    commonErrors: [
                        '错误1：忘记使用twinx()创建第二个Y轴，导致两个系列的数据因量级差异无法同时看清',
                        '错误2：两个Y轴使用相同的颜色，导致难以区分',
                        '错误3：忘记添加图例或图例位置设置不当，导致无法识别各系列',
                        '错误4：使用plt.legend()而不是fig.legend()，导致图例显示异常'
                    ]
                },
                {
                    title: '任务4：创建饼图',
                    objective: '绘制各季度销售额占比饼图',
                    hint: '先按季度分组，再绘制饼图',
                    steps: [
                        '步骤1：为数据添加季度列，将12个月份分为4个季度(Q1-Q4)，这样可以按季度汇总数据。',
                        '步骤2：使用groupby('季度')['销售额'].sum()按季度分组并计算每个季度的销售总额。',
                        '步骤3：创建一个(8,8)的正方形画布，饼图通常使用正方形画布效果更好。',
                        '步骤4：使用plt.pie()绘制饼图，设置labels显示季度名称，autopct='%1.1f%%'显示百分比，startangle=90让饼图从顶部开始，最后添加标题并显示图表。'
                    ],
                    code: `# TODO: 创建饼图
# 按季度分组
sales_data['季度'] = ['Q1','Q1','Q1','Q2','Q2','Q2','Q3','Q3','Q3','Q4','Q4','Q4']
quarter_sales = sales_data.groupby('季度')['销售额'].sum()

plt.figure(figsize=(8, 8))
plt.pie(quarter_sales, labels=quarter_sales.index, autopct='%1.1f%%', startangle=90)
plt.title('各季度销售额占比')
plt.show()`,
                    answer: `sales_data['季度'] = ['Q1','Q1','Q1','Q2','Q2','Q2','Q3','Q3','Q3','Q4','Q4','Q4']
quarter_sales = sales_data.groupby('季度')['销售额'].sum()

plt.figure(figsize=(8, 8))
plt.pie(quarter_sales, labels=quarter_sales.index, autopct='%1.1f%%', startangle=90)
plt.title('各季度销售额占比')
plt.show()`,
                    expected: '显示各季度销售额占比饼图',
                    commonErrors: [
                        '错误1：饼图画布不是正方形，导致饼图被拉伸变形',
                        '错误2：忘记设置labels参数，导致无法识别各部分代表什么',
                        '错误3：autopct格式设置错误，导致百分比显示异常',
                        '错误4：数据没有先汇总就直接绘制，导致每个月份都作为一个扇形'
                    ]
                }
            ],
            completeCode: `import pandas as pd
import matplotlib.pyplot as plt

# 创建模拟销售数据
sales_data = pd.DataFrame({
    '月份': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    '销售额': [12000, 15000, 18000, 16000, 20000, 22000, 25000, 23000, 21000, 24000, 28000, 35000],
    '利润': [2400, 3000, 3600, 3200, 4000, 4400, 5000, 4600, 4200, 4800, 5600, 7000],
    '订单数': [120, 150, 180, 160, 200, 220, 250, 230, 210, 240, 280, 350]
})

# 折线图
plt.figure(figsize=(12, 6))
plt.plot(sales_data['月份'], sales_data['销售额'], marker='o', linestyle='-', color='blue')
plt.title('月度销售额趋势')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.grid(True)
plt.show()`,
            summary: {
                keyPoints: ['Matplotlib是Python最常用的绘图库', 'Seaborn提供更美观的统计图表', '选择合适的图表类型很重要', '图表需要有清晰的标题和标签'],
                nextSteps: ['学习Seaborn高级图表', '学习交互式可视化库如Plotly', '了解数据可视化设计原则', '创建仪表盘']
            }
        }
    },
    {
        id: 'project6',
        title: '🧪 A/B测试分析',
        description: '掌握A/B测试的基本原理和数据分析方法',
        difficulty: '高级',
        duration: '60分钟',
        detail: {
            overview: {
                title: '项目概览',
                difficulty: '高级',
                duration: '60分钟',
                objectives: [
                    '理解A/B测试的基本概念',
                    '掌握假设检验的方法',
                    '学会计算统计显著性',
                    '能解读A/B测试结果',
                    '理解样本量计算'
                ]
            },
            background: 'A/B测试是一种常用的实验方法，用于比较两个或多个版本的效果。在互联网产品中，A/B测试常用于测试新功能、页面设计、营销策略等的效果，通过统计方法判断哪个版本更优。',
            dataset: {
                description: '模拟A/B测试数据，包含对照组和实验组的用户行为数据。',
                fields: [
                    { name: '组别', type: 'string', desc: 'A组（对照）/B组（实验）' },
                    { name: '用户数', type: 'int', desc: '用户数量' },
                    { name: '转化数', type: 'int', desc: '转化用户数' },
                    { name: '转化率', type: 'float', desc: '转化比例' }
                ],
                code: `import pandas as pd

# 创建模拟A/B测试数据
ab_data = pd.DataFrame({
    '组别': ['A组', 'B组'],
    '用户数': [1000, 1000],
    '转化数': [50, 75],
    '转化率': [0.05, 0.075]
})

print("=== A/B测试数据 ===")
print(ab_data)`
            },
            tasks: [
                {
                    title: '任务1：计算转化率',
                    objective: '计算两组的转化率',
                    hint: '转化数/用户数',
                    steps: [
                        '步骤1：使用ab_data['转化数'] / ab_data['用户数']计算每个组别的转化率，这是A/B测试中最基本的指标。',
                        '步骤2：将计算结果保存到新列'转化率'中，这样可以方便后续分析和比较。',
                        '步骤3：打印结果，查看两组的转化率差异，这是判断实验效果的第一步。',
                        '步骤4：注意转化率是一个比例值，通常在0到1之间，可以乘以100转换为百分比形式。'
                    ],
                    code: `# TODO: 计算转化率
ab_data['转化率'] = ab_data['转化数'] / ab_data['用户数']
print("转化率计算结果:")
print(ab_data)`,
                    answer: `ab_data['转化率'] = ab_data['转化数'] / ab_data['用户数']
print(ab_data)`,
                    expected: '显示两组的转化率',
                    commonErrors: [
                        '错误1：计算时忘记处理除零错误，虽然本例中用户数不为零，但实际应用中需要考虑',
                        '错误2：没有将结果保存到新列，导致后续分析时无法引用',
                        '错误3：直接使用整数除法，导致结果被截断为整数',
                        '错误4：没有检查数据类型，导致计算时出现类型错误'
                    ]
                },
                {
                    title: '任务2：卡方检验',
                    objective: '使用卡方检验判断差异是否显著',
                    hint: '使用scipy.stats.chi2_contingency',
                    steps: [
                        '步骤1：从scipy.stats导入chi2_contingency函数，这是用于卡方检验的标准方法，适用于分类数据的独立性检验。',
                        '步骤2：创建列联表，这是卡方检验的关键输入，格式为[[A组转化, A组未转化], [B组转化, B组未转化]]。',
                        '步骤3：调用chi2_contingency()函数，传入列联表，返回卡方值、p值和其他统计量。',
                        '步骤4：根据p值判断结果，通常p<0.05表示差异显著，即实验版本B确实比对照版本A效果更好。'
                    ],
                    code: `# TODO: 卡方检验
from scipy.stats import chi2_contingency

# 创建列联表
contingency_table = [
    [ab_data.loc[0, '转化数'], ab_data.loc[0, '用户数'] - ab_data.loc[0, '转化数']],
    [ab_data.loc[1, '转化数'], ab_data.loc[1, '用户数'] - ab_data.loc[1, '转化数']]
]

chi2, p_value, _, _ = chi2_contingency(contingency_table)
print(f"卡方值: {chi2:.4f}")
print(f"p值: {p_value:.4f}")
print(f"结论: {'差异显著' if p_value < 0.05 else '差异不显著'}")`,
                    answer: `from scipy.stats import chi2_contingency

contingency_table = [
    [ab_data.loc[0, '转化数'], ab_data.loc[0, '用户数'] - ab_data.loc[0, '转化数']],
    [ab_data.loc[1, '转化数'], ab_data.loc[1, '用户数'] - ab_data.loc[1, '转化数']]
]

chi2, p_value, _, _ = chi2_contingency(contingency_table)
print(f"卡方值: {chi2:.4f}")
print(f"p值: {p_value:.4f}")
print(f"结论: {'差异显著' if p_value < 0.05 else '差异不显著'}")`,
                    expected: '显示卡方检验结果和结论',
                    commonErrors: [
                        '错误1：列联表格式错误，行列顺序不正确',
                        '错误2：忘记导入scipy.stats库，导致函数未定义',
                        '错误3：p值判断阈值设置错误，应该是p<0.05而不是p>0.05',
                        '错误4：没有正确计算未转化数，导致列联表数据错误'
                    ]
                },
                {
                    title: '任务3：计算置信区间',
                    objective: '计算转化率的95%置信区间',
                    hint: '使用比例的置信区间公式',
                    steps: [
                        '步骤1：导入math模块，用于计算平方根，这是计算置信区间的关键数学操作。',
                        '步骤2：定义calculate_confidence_interval函数，接收转化数、总数和置信水平参数，默认95%置信水平。',
                        '步骤3：计算样本比例p = conversions/total，然后计算标准误se = sqrt(p*(1-p)/total)，这是衡量估计精度的指标。',
                        '步骤4：计算边际误差margin = z*se，其中z=1.96是95%置信水平对应的Z值，返回置信区间(p-margin, p+margin)。',
                        '步骤5：遍历两组数据，调用函数计算并打印每组的置信区间，置信区间越窄说明估计越精确。'
                    ],
                    code: `# TODO: 计算置信区间
import math

def calculate_confidence_interval(conversions, total, confidence=0.95):
    p = conversions / total
    z = 1.96  # 95%置信水平对应的Z值
    se = math.sqrt(p * (1 - p) / total)
    margin = z * se
    return (p - margin, p + margin)

for i in range(len(ab_data)):
    ci = calculate_confidence_interval(ab_data.loc[i, '转化数'], ab_data.loc[i, '用户数'])
    print(f"{ab_data.loc[i, '组别']} 95%置信区间: ({ci[0]:.4f}, {ci[1]:.4f})")`,
                    answer: `import math

def calculate_confidence_interval(conversions, total, confidence=0.95):
    p = conversions / total
    z = 1.96
    se = math.sqrt(p * (1 - p) / total)
    margin = z * se
    return (p - margin, p + margin)

for i in range(len(ab_data)):
    ci = calculate_confidence_interval(ab_data.loc[i, '转化数'], ab_data.loc[i, '用户数'])
    print(f"{ab_data.loc[i, '组别']} 95%置信区间: ({ci[0]:.4f}, {ci[1]:.4f})")`,
                    expected: '显示两组转化率的95%置信区间',
                    commonErrors: [
                        '错误1：忘记导入math模块，导致sqrt()函数未定义',
                        '错误2：标准误计算公式错误，应该是sqrt(p*(1-p)/n)而不是其他形式',
                        '错误3：Z值使用错误，95%置信水平应该用1.96而不是其他值',
                        '错误4：没有将结果格式化为百分比，导致输出不够直观'
                    ]
                },
                {
                    title: '任务4：计算相对提升',
                    objective: '计算B组相对A组的提升幅度',
                    hint: '(B转化率 - A转化率) / A转化率',
                    steps: [
                        '步骤1：使用公式(lift = (B转化率 - A转化率) / A转化率)计算相对提升，这是衡量实验效果的关键指标。',
                        '步骤2：注意数据的索引位置，A组是第0行，B组是第1行，确保使用正确的索引。',
                        '步骤3：将结果乘以100转换为百分比形式，这样更直观易懂。',
                        '步骤4：打印结果，显示B组相对A组的提升幅度，正数表示B组优于A组，负数表示A组更好。'
                    ],
                    code: `# TODO: 计算相对提升
lift = (ab_data.loc[1, '转化率'] - ab_data.loc[0, '转化率']) / ab_data.loc[0, '转化率']
print(f"B组相对A组的提升幅度: {lift * 100:.2f}%")`,
                    answer: `lift = (ab_data.loc[1, '转化率'] - ab_data.loc[0, '转化率']) / ab_data.loc[0, '转化率']
print(f"B组相对A组的提升幅度: {lift * 100:.2f}%")`,
                    expected: '显示B组相对A组的提升幅度',
                    commonErrors: [
                        '错误1：索引位置错误，把A组和B组搞反了',
                        '错误2：分母使用了错误的值，应该用A组转化率而不是B组',
                        '错误3：没有乘以100转换为百分比，导致结果是小数而不是百分比',
                        '错误4：忘记检查A组转化率是否为0，可能导致除零错误'
                    ]
                }
            ],
            completeCode: `import pandas as pd
from scipy.stats import chi2_contingency
import math

# 创建模拟A/B测试数据
ab_data = pd.DataFrame({
    '组别': ['A组', 'B组'],
    '用户数': [1000, 1000],
    '转化数': [50, 75]
})

# 计算转化率
ab_data['转化率'] = ab_data['转化数'] / ab_data['用户数']
print("=== 转化率 ===")
print(ab_data)

# 卡方检验
contingency_table = [
    [50, 950],
    [75, 925]
]
chi2, p_value, _, _ = chi2_contingency(contingency_table)
print(f"\\n=== 统计检验 ===")
print(f"p值: {p_value:.4f}")
print(f"结论: {'B组显著优于A组' if p_value < 0.05 else '两组无显著差异'}")`,
            summary: {
                keyPoints: ['A/B测试用于比较两个版本的效果', '卡方检验适用于转化率数据', 'p值小于0.05表示差异显著', '需要足够的样本量'],
                nextSteps: ['学习样本量计算', '了解其他统计检验方法', '学习功效分析', '了解多重比较问题']
            }
        }
    },
    {
        id: 'project7',
        title: '⏰ 时间序列分析',
        description: '掌握时间序列分析的基本方法和预测技术',
        difficulty: '高级',
        duration: '60分钟',
        detail: {
            overview: {
                title: '项目概览',
                difficulty: '高级',
                duration: '60分钟',
                objectives: [
                    '理解时间序列数据的特点',
                    '掌握时间序列可视化方法',
                    '学会计算移动平均',
                    '了解趋势和季节性分析',
                    '掌握基本的预测方法'
                ]
            },
            background: '时间序列分析是数据分析的重要分支，用于分析和预测随时间变化的数据。在商业领域，时间序列分析常用于销售预测、库存管理、需求预测等场景。',
            dataset: {
                description: '模拟月度销售数据，包含日期和销售额字段。',
                fields: [
                    { name: '日期', type: 'datetime', desc: '销售日期' },
                    { name: '销售额', type: 'float', desc: '销售金额' }
                ],
                code: `import pandas as pd

# 创建模拟时间序列数据
dates = pd.date_range(start='2023-01-01', periods=12, freq='M')
sales_ts = pd.DataFrame({
    '日期': dates,
    '销售额': [12000, 15000, 18000, 16000, 20000, 22000, 25000, 23000, 21000, 24000, 28000, 35000]
})

print("=== 时间序列数据 ===")
print(sales_ts)`
            },
            tasks: [
                {
                    title: '任务1：时间序列可视化',
                    objective: '绘制时间序列折线图',
                    hint: '使用plt.plot()绘制',
                    steps: [
                        '步骤1：导入matplotlib.pyplot库并简称为plt，这是绘制时间序列图表的基础工具。',
                        '步骤2：创建一个(12,6)的画布，适合展示时间序列数据的趋势变化。',
                        '步骤3：使用plt.plot()绘制折线图，x轴是日期，y轴是销售额，设置marker='o'显示数据点。',
                        '步骤4：添加标题、x轴标签和y轴标签，使用plt.xticks(rotation=45)旋转日期标签避免重叠，最后显示图表。'
                    ],
                    code: `# TODO: 时间序列可视化
import matplotlib.pyplot as plt

plt.figure(figsize=(12, 6))
plt.plot(sales_ts['日期'], sales_ts['销售额'], marker='o', linestyle='-')
plt.title('月度销售额时间序列')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.xticks(rotation=45)
plt.show()`,
                    answer: `import matplotlib.pyplot as plt

plt.figure(figsize=(12, 6))
plt.plot(sales_ts['日期'], sales_ts['销售额'], marker='o', linestyle='-')
plt.title('月度销售额时间序列')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.xticks(rotation=45)
plt.show()`,
                    expected: '显示时间序列折线图',
                    commonErrors: [
                        '错误1：日期列不是datetime类型，导致x轴显示异常',
                        '错误2：日期标签重叠，没有使用rotation参数旋转',
                        '错误3：没有设置合适的画布大小，导致图表显示不清晰',
                        '错误4：忘记调用plt.show()，导致图表不显示'
                    ]
                },
                {
                    title: '任务2：计算移动平均',
                    objective: '计算3期移动平均',
                    hint: '使用rolling().mean()',
                    steps: [
                        '步骤1：使用rolling(window=3)创建一个窗口大小为3的滚动对象，这会依次计算每3个连续数据点的平均值。',
                        '步骤2：在rolling对象上调用mean()方法计算移动平均值，这是平滑时间序列数据的常用方法。',
                        '步骤3：将计算结果保存到新列"移动平均(3期)"中，方便后续分析和可视化。',
                        '步骤4：打印结果，查看移动平均如何平滑原始数据的波动，前两行会显示NaN因为窗口不够。'
                    ],
                    code: `# TODO: 计算移动平均
sales_ts['移动平均(3期)'] = sales_ts['销售额'].rolling(window=3).mean()
print("时间序列数据与移动平均:")
print(sales_ts)`,
                    answer: `sales_ts['移动平均(3期)'] = sales_ts['销售额'].rolling(window=3).mean()
print(sales_ts)`,
                    expected: '显示包含移动平均列的数据',
                    commonErrors: [
                        '错误1：window参数设置错误，应该是整数而不是其他类型',
                        '错误2：没有将结果保存到新列，导致原始数据被覆盖',
                        '错误3：期望前几行有值，没有意识到移动平均会产生NaN',
                        '错误4：忘记导入pandas或数据不是DataFrame格式'
                    ]
                },
                {
                    title: '任务3：计算增长率',
                    objective: '计算环比增长率',
                    hint: '使用pct_change()',
                    steps: [
                        '步骤1：使用pct_change()方法计算环比增长率，这会计算当前值与前一个值的百分比变化。',
                        '步骤2：将结果乘以100转换为百分比形式，这样更直观易懂。',
                        '步骤3：将计算结果保存到新列"环比增长率"中，方便后续分析。',
                        '步骤4：打印日期、销售额和环比增长率三列，查看每个月的增长情况，第一行会显示NaN因为没有前一个值。'
                    ],
                    code: `# TODO: 计算增长率
sales_ts['环比增长率'] = sales_ts['销售额'].pct_change() * 100
print("时间序列数据与增长率:")
print(sales_ts[['日期', '销售额', '环比增长率']])`,
                    answer: `sales_ts['环比增长率'] = sales_ts['销售额'].pct_change() * 100
print(sales_ts[['日期', '销售额', '环比增长率']])`,
                    expected: '显示包含环比增长率的数据',
                    commonErrors: [
                        '错误1：忘记乘以100，导致结果是小数而不是百分比',
                        '错误2：没有选择正确的列，导致计算错误',
                        '错误3：期望第一行有值，没有意识到pct_change()会产生NaN',
                        '错误4：没有保存到新列，导致原始数据被覆盖'
                    ]
                },
                {
                    title: '任务4：简单预测',
                    objective: '使用最后值法进行预测',
                    hint: '用上一期的值预测下一期',
                    steps: [
                        '步骤1：使用iloc[-1]获取最后一行的销售额，这是最新的数据点。',
                        '步骤2：假设下一个月增长10%，将最后一个月销售额乘以1.1得到预测值。',
                        '步骤3：打印最后一个月销售额和预测值，展示预测结果。',
                        '步骤4：这是最简单的预测方法，实际应用中需要考虑趋势、季节性等因素。'
                    ],
                    code: `# TODO: 简单预测
last_value = sales_ts['销售额'].iloc[-1]
next_month_prediction = last_value * 1.1  # 假设增长10%
print(f"最后一个月销售额: {last_value}")
print(f"下一个月预测销售额: {next_month_prediction}")`,
                    answer: `last_value = sales_ts['销售额'].iloc[-1]
next_month_prediction = last_value * 1.1
print(f"最后一个月销售额: {last_value}")
print(f"下一个月预测销售额: {next_month_prediction}")`,
                    expected: '显示最后一个月销售额和预测值',
                    commonErrors: [
                        '错误1：使用了错误的索引，比如iloc[0]而不是iloc[-1]',
                        '错误2：增长系数设置不合理，导致预测结果偏差过大',
                        '错误3：没有考虑数据的趋势和季节性，导致预测不准确',
                        '错误4：没有保存预测结果，无法后续使用'
                    ]
                }
            ],
            completeCode: `import pandas as pd
import matplotlib.pyplot as plt

# 创建模拟时间序列数据
dates = pd.date_range(start='2023-01-01', periods=12, freq='M')
sales_ts = pd.DataFrame({
    '日期': dates,
    '销售额': [12000, 15000, 18000, 16000, 20000, 22000, 25000, 23000, 21000, 24000, 28000, 35000]
})

# 移动平均
sales_ts['移动平均(3期)'] = sales_ts['销售额'].rolling(window=3).mean()

# 增长率
sales_ts['环比增长率'] = sales_ts['销售额'].pct_change() * 100

print("=== 时间序列分析结果 ===")
print(sales_ts)`,
            summary: {
                keyPoints: ['时间序列数据按时间顺序排列', '移动平均用于平滑数据', '增长率反映变化幅度', '预测需要考虑趋势和季节性'],
                nextSteps: ['学习ARIMA模型', '了解指数平滑法', '学习Prophet预测', '分析季节性模式']
            }
        }
    },
    {
        id: 'project8',
        title: '🔧 特征工程',
        description: '掌握特征工程的基本方法和技巧',
        difficulty: '进阶',
        duration: '60分钟',
        detail: {
            overview: {
                title: '项目概览',
                difficulty: '进阶',
                duration: '60分钟',
                objectives: [
                    '理解特征工程的重要性',
                    '掌握数值特征处理方法',
                    '学会类别特征编码',
                    '了解特征选择方法',
                    '学会创建衍生特征'
                ]
            },
            background: '特征工程是机器学习的关键环节，好的特征可以显著提升模型性能。特征工程包括特征提取、特征转换、特征选择等步骤。',
            dataset: {
                description: '模拟客户数据，包含多种类型的特征。',
                fields: [
                    { name: '客户ID', type: 'string', desc: '客户唯一标识' },
                    { name: '年龄', type: 'int', desc: '客户年龄' },
                    { name: '性别', type: 'string', desc: '男/女' },
                    { name: '收入', type: 'float', desc: '年收入' },
                    { name: '消费金额', type: 'float', desc: '累计消费' },
                    { name: '会员等级', type: 'string', desc: '普通/银卡/金卡/钻石' }
                ],
                code: `import pandas as pd

# 创建模拟客户数据
customers = pd.DataFrame({
    '客户ID': ['C001', 'C002', 'C003', 'C004', 'C005', 'C006', 'C007', 'C008', 'C009', 'C010'],
    '年龄': [25, 32, 45, 28, 55, 38, 22, 41, 35, 29],
    '性别': ['男', '女', '男', '女', '男', '女', '男', '女', '男', '女'],
    '收入': [50000, 80000, 120000, 65000, 200000, 95000, 45000, 150000, 75000, 85000],
    '消费金额': [5800, 12500, 25000, 8900, 50000, 18900, 3200, 35000, 12000, 15600],
    '会员等级': ['普通', '银卡', '金卡', '普通', '钻石', '银卡', '普通', '钻石', '银卡', '银卡']
})

print("=== 客户数据 ===")
print(customers)`
            },
            tasks: [
                {
                    title: '任务1：数值特征标准化',
                    objective: '对数值特征进行标准化',
                    hint: '使用StandardScaler',
                    steps: [
                        '步骤1：从sklearn.preprocessing导入StandardScaler，这是标准化数值特征的常用工具。',
                        '步骤2：选择需要标准化的数值特征：年龄、收入和消费金额，这些特征量级差异较大。',
                        '步骤3：创建StandardScaler对象，使用fit_transform()方法对数据进行标准化，将数据转换为均值为0、标准差为1的分布。',
                        '步骤4：将标准化后的numpy数组转换为DataFrame，保持原有的列名，方便后续分析和使用。'
                    ],
                    code: `# TODO: 数值特征标准化
from sklearn.preprocessing import StandardScaler

numeric_features = customers[['年龄', '收入', '消费金额']]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(numeric_features)
scaled_df = pd.DataFrame(scaled_features, columns=numeric_features.columns)
print("标准化后的特征:")
print(scaled_df.head())`,
                    answer: `from sklearn.preprocessing import StandardScaler

numeric_features = customers[['年龄', '收入', '消费金额']]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(numeric_features)
scaled_df = pd.DataFrame(scaled_features, columns=numeric_features.columns)
print(scaled_df.head())`,
                    expected: '显示标准化后的数值特征',
                    commonErrors: [
                        '错误1：选择了非数值型特征进行标准化，导致报错',
                        '错误2：只使用transform()而不是fit_transform()，导致scaler没有学习数据的统计特征',
                        '错误3：没有将结果转换回DataFrame，直接使用numpy数组不方便',
                        '错误4：忘记导入sklearn.preprocessing模块'
                    ]
                },
                {
                    title: '任务2：类别特征编码',
                    objective: '对性别和会员等级进行编码',
                    hint: '使用OneHotEncoder或LabelEncoder',
                    code: `# TODO: 类别特征编码
# 性别使用LabelEncoder
from sklearn.preprocessing import LabelEncoder

customers['性别编码'] = LabelEncoder().fit_transform(customers['性别'])

# 会员等级使用OneHot编码
membership_dummies = pd.get_dummies(customers['会员等级'], prefix='会员')
customers = pd.concat([customers, membership_dummies], axis=1)
print("编码后的客户数据:")
print(customers[['客户ID', '性别', '性别编码', '会员等级', '会员_普通', '会员_银卡', '会员_金卡', '会员_钻石']])`,
                    answer: `from sklearn.preprocessing import LabelEncoder

customers['性别编码'] = LabelEncoder().fit_transform(customers['性别'])
membership_dummies = pd.get_dummies(customers['会员等级'], prefix='会员')
customers = pd.concat([customers, membership_dummies], axis=1)
print(customers[['客户ID', '性别', '性别编码', '会员等级', '会员_普通', '会员_银卡', '会员_金卡', '会员_钻石']])`,
                    expected: '显示编码后的类别特征'
                },
                {
                    title: '任务3：创建衍生特征',
                    objective: '创建消费占收入比例特征',
                    hint: '消费金额/收入',
                    code: `# TODO: 创建衍生特征
customers['消费占比'] = customers['消费金额'] / customers['收入']
customers['年龄分组'] = pd.cut(customers['年龄'], bins=[0, 30, 45, 60], labels=['青年', '中年', '老年'])
print("包含衍生特征的数据:")
print(customers[['客户ID', '年龄', '年龄分组', '消费金额', '收入', '消费占比']])`,
                    answer: `customers['消费占比'] = customers['消费金额'] / customers['收入']
customers['年龄分组'] = pd.cut(customers['年龄'], bins=[0, 30, 45, 60], labels=['青年', '中年', '老年'])
print(customers[['客户ID', '年龄', '年龄分组', '消费金额', '收入', '消费占比']])`,
                    expected: '显示包含衍生特征的数据'
                },
                {
                    title: '任务4：特征选择',
                    objective: '使用相关性分析选择特征',
                    hint: '计算特征之间的相关性',
                    code: `# TODO: 特征选择
correlation = customers[['年龄', '收入', '消费金额', '消费占比']].corr()
print("特征相关性矩阵:")
print(correlation)`,
                    answer: `correlation = customers[['年龄', '收入', '消费金额', '消费占比']].corr()
print(correlation)`,
                    expected: '显示特征之间的相关性矩阵'
                }
            ],
            completeCode: `import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder

# 创建模拟客户数据
customers = pd.DataFrame({
    '客户ID': ['C001', 'C002', 'C003', 'C004', 'C005', 'C006', 'C007', 'C008', 'C009', 'C010'],
    '年龄': [25, 32, 45, 28, 55, 38, 22, 41, 35, 29],
    '性别': ['男', '女', '男', '女', '男', '女', '男', '女', '男', '女'],
    '收入': [50000, 80000, 120000, 65000, 200000, 95000, 45000, 150000, 75000, 85000],
    '消费金额': [5800, 12500, 25000, 8900, 50000, 18900, 3200, 35000, 12000, 15600],
    '会员等级': ['普通', '银卡', '金卡', '普通', '钻石', '银卡', '普通', '钻石', '银卡', '银卡']
})

# 数值特征标准化
scaler = StandardScaler()
customers[['年龄', '收入', '消费金额']] = scaler.fit_transform(customers[['年龄', '收入', '消费金额']])

# 类别特征编码
customers['性别编码'] = LabelEncoder().fit_transform(customers['性别'])
customers = pd.concat([customers, pd.get_dummies(customers['会员等级'], prefix='会员')], axis=1)

print("=== 特征工程完成 ===")
print(customers.head())`,
            summary: {
                keyPoints: ['特征工程是机器学习的关键', '数值特征需要标准化', '类别特征需要编码', '衍生特征可以提升模型性能'],
                nextSteps: ['学习更多特征选择方法', '了解特征交叉', '学习特征重要性分析', '了解自动特征工程工具']
            }
        }
    },
    {
        id: 'project9',
        title: '⚠️ 异常值检测',
        description: '掌握异常值检测的常用方法和技术',
        difficulty: '高级',
        duration: '60分钟',
        detail: {
            overview: {
                title: '项目概览',
                difficulty: '高级',
                duration: '60分钟',
                objectives: [
                    '理解异常值的概念',
                    '掌握Z-score方法',
                    '学会使用IQR方法检测异常值',
                    '了解孤立森林算法',
                    '知道如何处理异常值'
                ]
            },
            background: '异常值检测是数据清洗和数据分析的重要环节。异常值可能是数据错误，也可能是有价值的业务洞察（如欺诈检测）。正确识别和处理异常值对分析结果至关重要。',
            dataset: {
                description: '模拟销售数据，包含正常数据和异常值。',
                fields: [
                    { name: '订单号', type: 'string', desc: '订单唯一标识' },
                    { name: '销售额', type: 'float', desc: '销售金额' },
                    { name: '数量', type: 'int', desc: '购买数量' },
                    { name: '单价', type: 'float', desc: '商品单价' }
                ],
                code: `import pandas as pd

# 创建模拟销售数据（包含异常值）
sales_data = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005', 'ORD006', 'ORD007', 'ORD008', 'ORD009', 'ORD010'],
    '销售额': [1200, 1500, 1800, 1600, 2000, 2200, 2500, 2300, 2100, 15000],  # 最后一个是异常值
    '数量': [2, 3, 4, 2, 5, 3, 4, 2, 3, 100],  # 最后一个是异常值
    '单价': [600, 500, 450, 800, 400, 733, 625, 1150, 700, 150]
})

print("=== 销售数据 ===")
print(sales_data)`
            },
            tasks: [
                {
                    title: '任务1：Z-score方法检测异常值',
                    objective: '使用Z-score识别异常值',
                    hint: 'Z-score大于3或小于-3视为异常',
                    steps: [
                        '步骤1：从scipy.stats导入zscore函数，这是计算Z-score的标准方法，用于衡量数据点与均值的标准差距离。',
                        '步骤2：使用zscore()函数计算销售额列的Z-score值，将结果保存到新列"销售额_zscore"中。',
                        '步骤3：判断每个数据点的Z-score绝对值是否大于3，大于3的数据点视为异常值，保存到"是异常值_zscore"列。',
                        '步骤4：打印订单号、销售额、Z-score值和是否为异常值的结果，查看哪些订单被识别为异常。'
                    ],
                    code: `# TODO: Z-score方法
from scipy.stats import zscore

sales_data['销售额_zscore'] = zscore(sales_data['销售额'])
sales_data['是异常值_zscore'] = abs(sales_data['销售额_zscore']) > 3
print("Z-score检测结果:")
print(sales_data[['订单号', '销售额', '销售额_zscore', '是异常值_zscore']])`,
                    answer: `from scipy.stats import zscore

sales_data['销售额_zscore'] = zscore(sales_data['销售额'])
sales_data['是异常值_zscore'] = abs(sales_data['销售额_zscore']) > 3
print(sales_data[['订单号', '销售额', '销售额_zscore', '是异常值_zscore']])`,
                    expected: '显示Z-score检测结果',
                    commonErrors: [
                        '错误1：忘记导入scipy.stats模块，导致zscore未定义报错',
                        '错误2：使用zscore时没有传入正确的列，导致计算错误',
                        '错误3：忘记使用abs()取绝对值，导致只检测正方向的异常值',
                        '错误4：阈值设置不合理，比如使用2而不是3，导致误判或漏判'
                    ]
                },
                {
                    title: '任务2：IQR方法检测异常值',
                    objective: '使用IQR方法识别异常值',
                    hint: 'Q1 - 1.5*IQR 和 Q3 + 1.5*IQR 之外视为异常',
                    steps: [
                        '步骤1：定义detect_outliers_iqr函数，接收一个Series数据作为参数，这是IQR方法的核心实现。',
                        '步骤2：计算第一四分位数Q1（quantile(0.25)）和第三四分位数Q3（quantile(0.75)），这两个值确定了数据的中间50%范围。',
                        '步骤3：计算IQR（四分位距）= Q3 - Q1，然后计算下界=Q1-1.5*IQR和上界=Q3+1.5*IQR，超出这个范围的值视为异常值。',
                        '步骤4：调用函数检测销售额列的异常值，保存结果到"是异常值_iqr"列，然后打印检测结果。'
                    ],
                    code: `# TODO: IQR方法
def detect_outliers_iqr(data):
    q1 = data.quantile(0.25)
    q3 = data.quantile(0.75)
    iqr = q3 - q1
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr
    return (data < lower_bound) | (data > upper_bound)

sales_data['是异常值_iqr'] = detect_outliers_iqr(sales_data['销售额'])
print("IQR检测结果:")
print(sales_data[['订单号', '销售额', '是异常值_iqr']])`,
                    answer: `def detect_outliers_iqr(data):
    q1 = data.quantile(0.25)
    q3 = data.quantile(0.75)
    iqr = q3 - q1
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr
    return (data < lower_bound) | (data > upper_bound)

sales_data['是异常值_iqr'] = detect_outliers_iqr(sales_data['销售额'])
print(sales_data[['订单号', '销售额', '是异常值_iqr']])`,
                    expected: '显示IQR检测结果',
                    commonErrors: [
                        '错误1：忘记导入pandas或数据不是DataFrame格式',
                        '错误2：使用and/or而不是&/|，导致布尔运算错误',
                        '错误3：函数返回值没有正确赋值给DataFrame列',
                        '错误4：忘记处理边界情况，如数据为空或只有一个值'
                    ]
                },
                {
                    title: '任务3：孤立森林检测异常值',
                    objective: '使用孤立森林算法检测异常值',
                    hint: '使用IsolationForest',
                    steps: [
                        '步骤1：从sklearn.ensemble导入IsolationForest类，这是一种基于随机森林的异常检测算法，适用于高维数据。',
                        '步骤2：创建IsolationForest对象，设置contamination=0.1表示预计异常值比例为10%，random_state=42保证结果可复现。',
                        '步骤3：使用fit_predict()方法在销售额、数量、单价三列上训练模型并预测异常值，返回1表示正常点，-1表示异常点。',
                        '步骤4：将预测结果转换为布尔值，-1对应True（异常值），保存到"是异常值_孤立森林"列，然后打印检测结果。'
                    ],
                    code: `# TODO: 孤立森林
from sklearn.ensemble import IsolationForest

clf = IsolationForest(contamination=0.1, random_state=42)
sales_data['异常值分数'] = clf.fit_predict(sales_data[['销售额', '数量', '单价']])
sales_data['是异常值_孤立森林'] = sales_data['异常值分数'] == -1
print("孤立森林检测结果:")
print(sales_data[['订单号', '销售额', '数量', '是异常值_孤立森林']])`,
                    answer: `from sklearn.ensemble import IsolationForest

clf = IsolationForest(contamination=0.1, random_state=42)
sales_data['异常值分数'] = clf.fit_predict(sales_data[['销售额', '数量', '单价']])
sales_data['是异常值_孤立森林'] = sales_data['异常值分数'] == -1
print(sales_data[['订单号', '销售额', '数量', '是异常值_孤立森林']])`,
                    expected: '显示孤立森林检测结果',
                    commonErrors: [
                        '错误1：忘记导入sklearn.ensemble模块，导致IsolationForest未定义',
                        '错误2：contamination参数设置不合理，导致检测结果不符合预期',
                        '错误3：传入的数据包含非数值型列，导致fit_predict()报错',
                        '错误4：没有正确解释预测结果，将1和-1的含义搞反'
                    ]
                },
                {
                    title: '任务4：处理异常值',
                    objective: '选择合适的方式处理异常值',
                    hint: '删除或替换异常值',
                    steps: [
                        '步骤1：方法1 - 删除异常值：使用布尔索引筛选出不是异常值的记录，使用copy()确保创建副本而不是视图，保存到clean_data变量。',
                        '步骤2：方法2 - 用中位数替换异常值：首先计算正常数据的中位数（不包含异常值），然后使用where()方法将异常值替换为中位数。',
                        '步骤3：where()方法会保留满足条件(~sales_data['是异常值_iqr'])的值，将不满足条件的值替换为指定的中位数。',
                        '步骤4：打印原始数据中的异常值数量和删除后的数据量，验证处理效果，选择哪种方法取决于业务需求和异常值比例。'
                    ],
                    code: `# TODO: 处理异常值
# 方法1：删除异常值
clean_data = sales_data[sales_data['是异常值_iqr'] == False].copy()

# 方法2：用中位数替换异常值
median_sales = sales_data[sales_data['是异常值_iqr'] == False]['销售额'].median()
sales_data['销售额_修正'] = sales_data['销售额'].where(~sales_data['是异常值_iqr'], median_sales)

print("原始数据异常值数量:", sales_data['是异常值_iqr'].sum())
print("删除后数据量:", len(clean_data))`,
                    answer: `clean_data = sales_data[sales_data['是异常值_iqr'] == False].copy()
median_sales = sales_data[sales_data['是异常值_iqr'] == False]['销售额'].median()
sales_data['销售额_修正'] = sales_data['销售额'].where(~sales_data['是异常值_iqr'], median_sales)

print("原始数据异常值数量:", sales_data['是异常值_iqr'].sum())
print("删除后数据量:", len(clean_data))`,
                    expected: '显示处理异常值后的结果',
                    commonErrors: [
                        '错误1：忘记使用copy()，导致clean_data只是原数据的视图而非副本',
                        '错误2：计算中位数时包含了异常值，导致中位数被异常值影响',
                        '错误3：where()方法的条件写反，应该是~sales_data['是异常值_iqr']',
                        '错误4：没有保存处理后的结果，导致修改丢失'
                    ]
                }
            ],
            completeCode: `import pandas as pd
from scipy.stats import zscore
from sklearn.ensemble import IsolationForest

# 创建模拟销售数据
sales_data = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005', 'ORD006', 'ORD007', 'ORD008', 'ORD009', 'ORD010'],
    '销售额': [1200, 1500, 1800, 1600, 2000, 2200, 2500, 2300, 2100, 15000],
    '数量': [2, 3, 4, 2, 5, 3, 4, 2, 3, 100],
    '单价': [600, 500, 450, 800, 400, 733, 625, 1150, 700, 150]
})

# Z-score检测
sales_data['zscore'] = zscore(sales_data['销售额'])
sales_data['is_outlier'] = abs(sales_data['zscore']) > 3

print("=== 异常值检测结果 ===")
print(sales_data[['订单号', '销售额', 'zscore', 'is_outlier']])`,
            summary: {
                keyPoints: ['Z-score适用于正态分布数据', 'IQR方法更稳健', '孤立森林适用于高维数据', '处理异常值需要结合业务理解'],
                nextSteps: ['学习DBSCAN异常检测', '了解LOF算法', '学习自动异常检测工具', '了解异常值的业务含义']
            }
        }
    },
    {
        id: 'project10',
        title: '🔗 多数据集合并',
        description: '掌握Pandas多数据集合并的方法和技巧',
        difficulty: '进阶',
        duration: '60分钟',
        detail: {
            overview: {
                title: '项目概览',
                difficulty: '进阶',
                duration: '60分钟',
                objectives: [
                    '理解不同类型的连接操作',
                    '掌握merge()方法',
                    '学会使用join()和concat()',
                    '了解连接类型（内连接、外连接等）',
                    '能处理多表连接'
                ]
            },
            background: '在实际数据分析中，数据通常存储在多个表中，需要进行连接操作来整合数据。掌握多表连接是数据分析的必备技能。',
            dataset: {
                description: '模拟销售数据，包含订单表、客户表和产品表。',
                fields: [
                    { name: '订单表', desc: '订单号、客户ID、产品ID、数量、金额' },
                    { name: '客户表', desc: '客户ID、姓名、地区' },
                    { name: '产品表', desc: '产品ID、产品名称、类别' }
                ],
                code: `import pandas as pd

# 创建模拟数据
orders = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005'],
    '客户ID': ['C001', 'C002', 'C003', 'C001', 'C004'],
    '产品ID': ['P001', 'P002', 'P001', 'P003', 'P002'],
    '数量': [2, 1, 3, 1, 2],
    '金额': [200, 150, 300, 250, 300]
})

customers = pd.DataFrame({
    '客户ID': ['C001', 'C002', 'C003', 'C005'],
    '姓名': ['张三', '李四', '王五', '赵六'],
    '地区': ['北京', '上海', '广州', '深圳']
})

products = pd.DataFrame({
    '产品ID': ['P001', 'P002', 'P003', 'P004'],
    '产品名称': ['笔记本', '鼠标', '键盘', '显示器'],
    '类别': ['电子产品', '电子产品', '电子产品', '电子产品']
})

print("=== 订单表 ===")
print(orders)
print("\\n=== 客户表 ===")
print(customers)
print("\\n=== 产品表 ===")
print(products)`
            },
            tasks: [
                {
                    title: '任务1：内连接',
                    objective: '将订单表与客户表进行内连接',
                    hint: '使用merge()，默认是内连接',
                    steps: [
                        '步骤1：使用pd.merge()方法进行内连接，第一个参数是左表orders，第二个参数是右表customers。',
                        '步骤2：设置on="客户ID"指定连接键，merge()默认执行内连接（how="inner"），只保留两个表中连接键匹配的记录。',
                        '步骤3：将连接结果保存到orders_customers变量，这样可以继续后续分析。',
                        '步骤4：打印连接结果，查看订单信息和对应的客户信息，注意内连接会丢弃不匹配的记录（如ORD005订单对应的C004客户不在客户表中）。'
                    ],
                    code: `# TODO: 内连接
orders_customers = pd.merge(orders, customers, on='客户ID')
print("订单表与客户表内连接结果:")
print(orders_customers)`,
                    answer: `orders_customers = pd.merge(orders, customers, on='客户ID')
print(orders_customers)`,
                    expected: '显示内连接结果，只包含匹配的记录',
                    commonErrors: [
                        '错误1：连接键列名不一致，导致无法正确匹配，需要使用left_on和right_on参数',
                        '错误2：忘记指定on参数，导致merge()尝试自动匹配同名列，可能产生意外结果',
                        '错误3：数据类型不匹配，比如一个是整数一个是字符串，导致无法匹配',
                        '错误4：没有保存连接结果，导致后续无法使用'
                    ]
                },
                {
                    title: '任务2：左连接',
                    objective: '将订单表与客户表进行左连接',
                    hint: '使用how="left"',
                    steps: [
                        '步骤1：使用pd.merge()方法进行左连接，设置how="left"参数，这会保留左表（orders）的所有记录。',
                        '步骤2：设置on="客户ID"指定连接键，右表（customers）中匹配的记录会被合并，不匹配的记录会用NaN填充。',
                        '步骤3：将连接结果保存到orders_customers_left变量，便于后续分析和对比。',
                        '步骤4：打印连接结果，可以看到ORD005订单对应的客户信息显示为NaN，因为C004客户不在客户表中。'
                    ],
                    code: `# TODO: 左连接
orders_customers_left = pd.merge(orders, customers, on='客户ID', how='left')
print("订单表与客户表左连接结果:")
print(orders_customers_left)`,
                    answer: `orders_customers_left = pd.merge(orders, customers, on='客户ID', how='left')
print(orders_customers_left)`,
                    expected: '显示左连接结果，包含订单表所有记录',
                    commonErrors: [
                        '错误1：混淆了左连接和右连接的含义，应该是保留左表所有记录',
                        '错误2：how参数拼写错误，比如写成"left_join"而不是"left"',
                        '错误3：没有正确处理连接后的NaN值，影响后续分析',
                        '错误4：忘记设置on参数，导致连接行为不符合预期'
                    ]
                },
                {
                    title: '任务3：多表连接',
                    objective: '将订单表、客户表和产品表连接在一起',
                    hint: '连续使用merge()',
                    steps: [
                        '步骤1：先将订单表和客户表进行左连接，使用"客户ID"作为连接键，保留所有订单记录，结果保存到full_data。',
                        '步骤2：将上一步的结果full_data与产品表进行左连接，使用"产品ID"作为连接键，保留所有订单记录。',
                        '步骤3：两次连接都使用how="left"确保不丢失订单数据，这是数据分析中常用的保守策略。',
                        '步骤4：打印最终的多表连接结果，可以看到订单、客户和产品的完整信息，不匹配的字段显示为NaN。'
                    ],
                    code: `# TODO: 多表连接
full_data = pd.merge(orders, customers, on='客户ID', how='left')
full_data = pd.merge(full_data, products, on='产品ID', how='left')
print("多表连接结果:")
print(full_data)`,
                    answer: `full_data = pd.merge(orders, customers, on='客户ID', how='left')
full_data = pd.merge(full_data, products, on='产品ID', how='left')
print(full_data)`,
                    expected: '显示三表连接结果',
                    commonErrors: [
                        '错误1：连接顺序错误，应该先连接两个表，再连接第三个表',
                        '错误2：连接键设置错误，导致数据无法正确匹配',
                        '错误3：忘记设置how="left"，默认内连接会丢失不匹配的记录',
                        '错误4：没有检查连接后的NaN值，影响后续统计分析'
                    ]
                },
                {
                    title: '任务4：按地区统计销售',
                    objective: '按地区统计销售总额',
                    hint: '先连接再分组聚合',
                    steps: [
                        '步骤1：使用groupby("地区")将连接后的数据按地区分组，这是进行分组统计的基础操作。',
                        '步骤2：使用agg()方法进行聚合计算，计算每个地区的订单数（count）、销售总额（sum）和平均金额（mean）。',
                        '步骤3：为聚合结果指定清晰的列名（订单数、销售总额、平均金额），使用round(2)保留两位小数。',
                        '步骤4：打印按地区统计的销售数据，可以看到每个地区的销售表现，注意NaN地区（没有匹配客户的订单）也会被统计。'
                    ],
                    code: `# TODO: 按地区统计销售
region_sales = full_data.groupby('地区').agg(
    订单数=('订单号', 'count'),
    销售总额=('金额', 'sum'),
    平均金额=('金额', 'mean')
).round(2)
print("按地区销售统计:")
print(region_sales)`,
                    answer: `region_sales = full_data.groupby('地区').agg(
    订单数=('订单号', 'count'),
    销售总额=('金额', 'sum'),
    平均金额=('金额', 'mean')
).round(2)
print(region_sales)`,
                    expected: '显示按地区统计的销售数据',
                    commonErrors: [
                        '错误1：在groupby之前没有进行多表连接，导致地区列不存在',
                        '错误2：agg()中的列名拼写错误，导致无法正确聚合',
                        '错误3：忘记使用round()保留小数，导致结果显示过多位小数',
                        '错误4：没有处理NaN值，导致统计结果包含未知地区的数据'
                    ]
                }
            ],
            completeCode: `import pandas as pd

# 创建模拟数据
orders = pd.DataFrame({
    '订单号': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005'],
    '客户ID': ['C001', 'C002', 'C003', 'C001', 'C004'],
    '产品ID': ['P001', 'P002', 'P001', 'P003', 'P002'],
    '数量': [2, 1, 3, 1, 2],
    '金额': [200, 150, 300, 250, 300]
})

customers = pd.DataFrame({
    '客户ID': ['C001', 'C002', 'C003', 'C005'],
    '姓名': ['张三', '李四', '王五', '赵六'],
    '地区': ['北京', '上海', '广州', '深圳']
})

products = pd.DataFrame({
    '产品ID': ['P001', 'P002', 'P003', 'P004'],
    '产品名称': ['笔记本', '鼠标', '键盘', '显示器'],
    '类别': ['电子产品', '电子产品', '电子产品', '电子产品']
})

# 多表连接
full_data = pd.merge(orders, customers, on='客户ID', how='left')
full_data = pd.merge(full_data, products, on='产品ID', how='left')

print("=== 多表连接结果 ===")
print(full_data)`,
            summary: {
                keyPoints: ['merge()是最常用的连接方法', '内连接只保留匹配记录', '左连接保留左表所有记录', '多表连接可以分步进行'],
                nextSteps: ['学习join()方法', '了解concat()方法', '学习连接性能优化', '了解SQL风格的连接']
            }
        }
    }
];