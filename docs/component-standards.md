# 组件开发规范

## 组件设计原则

### 1. 单一职责原则

每个组件应该只负责一个功能，保持职责单一且明确。

### 2. 组合优于继承

通过组合多个小组件来构建复杂功能，而不是创建复杂的单一组件。

### 3. 一致性原则

- API 设计保持一致
- 样式规范保持统一
- 行为模式保持相同

### 4. 可访问性优先

所有组件必须满足 WCAG 2.1 AA 级别的可访问性标准。

## 组件分层架构

### Atoms（原子组件）

最基础的 UI 构建块，不可再分解。

**特征：**

- 无状态或只有简单的内部状态
- 高度可复用
- 样式和行为一致

**示例：**

```tsx
// Button 原子组件
export const Button = ({ children, variant, size, ...props }) => {
  return (
    <button className={cn(baseClasses, variantClasses[variant], sizeClasses[size])} {...props}>
      {children}
    </button>
  );
};
```

### Molecules（分子组件）

由多个原子组件组成的相对简单的组件。

**特征：**

- 组合多个原子组件
- 有特定的用途和功能
- 可以有一些状态管理

**示例：**

```tsx
// SearchBox 分子组件
export const SearchBox = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState('');

  return (
    <div className='flex'>
      <Input value={query} onChange={setQuery} placeholder={placeholder} />
      <Button onClick={() => onSearch(query)} leftIcon={<SearchIcon />}>
        搜索
      </Button>
    </div>
  );
};
```

### Organisms（组织体组件）

复杂的 UI 区域，由分子和原子组件组成。

**特征：**

- 包含复杂的业务逻辑
- 管理多个子组件的状态
- 通常是页面的一个区域

## 组件 API 设计规范

### Props 命名约定

```tsx
interface ComponentProps {
  // 基础属性
  children?: ReactNode;
  className?: string;
  id?: string;

  // 状态属性
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;

  // 尺寸和变体
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';

  // 事件处理
  onClick?: (event: MouseEvent) => void;
  onChange?: (value: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;

  // 无障碍访问
  'aria-label'?: string;
  'aria-describedby'?: string;
  'data-testid'?: string;
}
```

### Props 设计原则

1. **直观性**: Props 名称应该清晰表达其用途
2. **一致性**: 相同功能的 props 在不同组件中保持相同命名
3. **可选性**: 尽可能提供合理的默认值
4. **类型安全**: 使用 TypeScript 确保类型安全

### 默认值处理

```tsx
// ✅ 推荐：使用默认参数
export const Button = ({ variant = 'primary', size = 'md', disabled = false, ...props }) => {
  // 组件实现
};

// ❌ 不推荐：在组件内部处理默认值
export const Button = props => {
  const variant = props.variant || 'primary';
  const size = props.size || 'md';
  // ...
};
```

## 样式规范

### 1. Tailwind CSS 使用规范

#### 基础类名结构

```tsx
const buttonClasses = cn(
  // 基础样式
  'inline-flex items-center justify-center',
  'font-medium transition-colors',
  'focus:outline-none focus:ring-2',

  // 尺寸相关
  sizeClasses[size],

  // 变体相关
  variantClasses[variant],

  // 状态相关
  {
    'opacity-50 cursor-not-allowed': disabled,
    'cursor-pointer': !disabled,
  },

  // 自定义类名
  className
);
```

#### 响应式设计

```tsx
// ✅ 移动优先的响应式设计
<div className="w-full md:w-1/2 lg:w-1/3">
  Content
</div>

// ✅ 使用自定义断点
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
  Grid items
</div>
```

### 2. CSS 变量主题系统

#### 定义主题变量

```css
:root {
  /* 颜色系统 */
  --color-primary-50: 239 246 255;
  --color-primary-500: 59 130 246;
  --color-primary-900: 30 58 138;

  /* 间距系统 */
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;
  --spacing-md: 1rem;

  /* 字体系统 */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
}
```

#### 使用主题变量

```tsx
// 通过 Tailwind 类名使用
<button className='bg-primary-500 text-primary-50'>Primary Button</button>;

// 通过工具函数使用
const classes = getVariantClasses('primary', 'bg');
```

### 3. 暗黑模式支持

```css
.dark {
  --color-primary-50: 30 58 138;
  --color-primary-500: 96 165 250;
  --color-primary-900: 239 246 255;
}
```

```tsx
// 组件中的暗黑模式适配
<div className='bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'>Content</div>
```

## 状态管理规范

### 1. 本地状态管理

```tsx
// ✅ 使用 useState 处理简单状态
const [isOpen, setIsOpen] = useState(false);
const [inputValue, setInputValue] = useState('');

// ✅ 使用 useReducer 处理复杂状态
const [state, dispatch] = useReducer(reducer, initialState);
```

### 2. 受控与非受控组件

```tsx
// 受控组件
export const ControlledInput = ({ value, onChange, ...props }) => {
  return <input value={value} onChange={e => onChange(e.target.value)} {...props} />;
};

// 非受控组件
export const UncontrolledInput = ({ defaultValue, ...props }) => {
  return <input defaultValue={defaultValue} {...props} />;
};

// 支持两种模式的组件
export const FlexibleInput = ({ value, defaultValue, onChange, ...props }) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = value !== undefined;

  const currentValue = isControlled ? value : internalValue;

  const handleChange = newValue => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return <input value={currentValue} onChange={e => handleChange(e.target.value)} {...props} />;
};
```

## 事件处理规范

### 1. 事件处理器命名

```tsx
interface ComponentProps {
  // ✅ 推荐：使用 onAction 模式
  onClick?: (event: MouseEvent) => void;
  onChange?: (value: string, event: ChangeEvent) => void;
  onSubmit?: (data: FormData) => void;

  // ❌ 不推荐：不一致的命名
  handleClick?: () => void;
  clickHandler?: () => void;
}
```

### 2. 事件参数设计

```tsx
// ✅ 推荐：提供有用的参数，事件对象放在最后
onChange?: (value: string, event: ChangeEvent) => void;
onSelect?: (selectedItem: Item, index: number, event: MouseEvent) => void;

// ❌ 不推荐：只提供原始事件对象
onChange?: (event: ChangeEvent) => void;
```

### 3. 事件处理最佳实践

```tsx
export const Button = ({ onClick, disabled, ...props }) => {
  const handleClick = (event: MouseEvent) => {
    // 阻止默认行为和冒泡（如果需要）
    event.preventDefault();

    // 检查组件状态
    if (disabled) {
      return;
    }

    // 调用外部处理器
    onClick?.(event);
  };

  return (
    <button onClick={handleClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
```

## 无障碍访问规范

### 1. 语义化 HTML

```tsx
// ✅ 推荐：使用语义化元素
<nav aria-label="主导航">
  <ul>
    <li><a href="/home">首页</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</nav>

// ❌ 不推荐：使用非语义化元素
<div className="nav">
  <div className="nav-item">首页</div>
  <div className="nav-item">关于</div>
</div>
```

### 2. ARIA 标签

```tsx
// 为交互元素提供适当的标签
<button
  aria-label="关闭对话框"
  aria-expanded={isOpen}
  aria-controls="menu-list"
>
  <CloseIcon aria-hidden="true" />
</button>

// 为表单提供描述
<input
  aria-describedby="password-help"
  aria-invalid={hasError}
/>
<div id="password-help">
  密码至少需要8个字符
</div>
```

### 3. 键盘导航

```tsx
const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      onClick?.(event);
      break;
    case 'Escape':
      onClose?.();
      break;
    case 'ArrowDown':
      focusNextItem();
      break;
    case 'ArrowUp':
      focusPreviousItem();
      break;
  }
};
```

### 4. 焦点管理

```tsx
// 管理焦点状态
const [focusVisible, setFocusVisible] = useState(false);

const handleFocus = () => setFocusVisible(true);
const handleBlur = () => setFocusVisible(false);

return (
  <button
    className={cn('focus:outline-none', { 'ring-2 ring-primary-500': focusVisible })}
    onFocus={handleFocus}
    onBlur={handleBlur}
  >
    Button
  </button>
);
```

## 性能优化规范

### 1. 避免不必要的重渲染

```tsx
// ✅ 使用 React.memo
export const ExpensiveComponent = React.memo(({ data, onAction }) => {
  return <div>{/* 复杂的渲染逻辑 */}</div>;
});

// ✅ 使用 useMemo 缓存计算结果
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ 使用 useCallback 缓存事件处理器
const handleClick = useCallback(
  id => {
    onItemClick(id);
  },
  [onItemClick]
);
```

### 2. 懒加载

```tsx
// 组件懒加载
const LazyComponent = React.lazy(() => import('./LazyComponent'));

export const Container = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};
```

### 3. 虚拟化长列表

```tsx
// 对于长列表，考虑使用虚拟化
import { FixedSizeList } from 'react-window';

const VirtualizedList = ({ items }) => {
  const Row = ({ index, style }) => <div style={style}>{items[index]}</div>;

  return (
    <FixedSizeList height={600} itemCount={items.length} itemSize={50}>
      {Row}
    </FixedSizeList>
  );
};
```

## 错误处理规范

### 1. 错误边界

```tsx
class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

### 2. 错误状态处理

```tsx
export const DataComponent = ({ dataSource }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    loadData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;

  return <DataDisplay data={data} />;
};
```

## 测试规范

### 1. 测试文件结构

```tsx
// ComponentName.test.tsx
describe('ComponentName', () => {
  // 基础渲染测试
  describe('rendering', () => {
    it('renders correctly', () => {});
    it('renders with different props', () => {});
  });

  // 交互测试
  describe('interactions', () => {
    it('handles click events', () => {});
    it('handles keyboard navigation', () => {});
  });

  // 状态测试
  describe('state management', () => {
    it('updates state correctly', () => {});
  });

  // 边界情况测试
  describe('edge cases', () => {
    it('handles empty data', () => {});
    it('handles error states', () => {});
  });
});
```

### 2. 测试最佳实践

```tsx
// ✅ 测试用户行为，而不是实现细节
test('shows error message when validation fails', async () => {
  render(<LoginForm />);

  const submitButton = screen.getByRole('button', { name: /登录/i });
  await userEvent.click(submitButton);

  expect(screen.getByText(/请输入用户名/i)).toBeInTheDocument();
});

// ❌ 不要测试内部实现
test('calls setState with correct value', () => {
  // 这种测试过于关注实现细节
});
```

## 文档规范

### 1. JSDoc 注释

````tsx
/**
 * Button 组件 - 基础按钮组件
 *
 * @param variant - 按钮样式变体
 * @param size - 按钮尺寸
 * @param disabled - 是否禁用
 * @param loading - 是否显示加载状态
 * @param children - 按钮内容
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   点击我
 * </Button>
 * ```
 */
export const Button = ({ variant, size, disabled, loading, children, ...props }) => {
  // 组件实现
};
````

### 2. Storybook 文档

```tsx
const meta: Meta<typeof Button> = {
  title: 'Components/Atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: '基础按钮组件，支持多种样式和状态。',
      },
    },
  },
  argTypes: {
    variant: {
      description: '按钮样式变体',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
    },
  },
};
```

## 版本控制规范

### 1. 语义化版本

- **Major (X.0.0)**: 破坏性更改
- **Minor (0.X.0)**: 新功能，向后兼容
- **Patch (0.0.X)**: Bug 修复，向后兼容

### 2. 变更日志

```markdown
# Changelog

## [1.2.0] - 2024-03-15

### Added

- 新增 Card 组件
- 新增暗黑模式支持

### Changed

- Button 组件 API 优化
- 更新了颜色系统

### Fixed

- 修复 Input 组件的焦点问题

### Deprecated

- `oldProp` 属性已弃用，请使用 `newProp`

### Removed

- 移除了已弃用的 `LegacyComponent`
```

这些规范确保了组件库的一致性、可维护性和高质量。团队成员应该严格遵循这些规范来开发组件。
