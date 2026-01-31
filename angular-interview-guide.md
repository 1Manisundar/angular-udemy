# Angular Interview Guide
## Component Architecture, Interpolation & Property Binding

---

## 1. Component-Based Architecture

### What is Component-Based Architecture in Angular?

Component-based architecture is the foundational design pattern in Angular where the application is built using **components as building blocks**.

**Key Characteristics:**
- Each component is self-contained with its own template, logic, and styles
- Components communicate with each other through defined interfaces
- Promotes reusability and modularity
- Enables separation of concerns

### Component Structure

```
Component
├── HTML Template (View)
├── TypeScript Class (Logic)
├── CSS/SCSS (Styles)
└── Testing File (Unit Tests)
```

### Component Files

When you create a new component (excluding root component), Angular generates:

| File | Purpose | Example |
|------|---------|---------|
| `.html` | Template/View | `user-profile.component.html` |
| `.css/.scss` | Styles | `user-profile.component.css` |
| `.ts` | Logic/Class | `user-profile.component.ts` |
| `.spec.ts` | Unit Tests | `user-profile.component.spec.ts` |

### Example Component Structure

```typescript
// user-profile.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userName: string = 'John Doe';
  userAge: number = 30;
  isActive: boolean = true;
  
  getUserInfo(): string {
    return `${this.userName}, Age: ${this.userAge}`;
  }
}
```

```html
<!-- user-profile.component.html -->
<div class="profile-container">
  <h2>User Profile</h2>
  <p>Name: {{ userName }}</p>
  <p>Age: {{ userAge }}</p>
  <p>Status: {{ isActive ? 'Active' : 'Inactive' }}</p>
</div>
```

```css
/* user-profile.component.css */
.profile-container {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
}

h2 {
  color: #333;
  margin-bottom: 15px;
}
```

### Component Communication Flow

```
┌─────────────────────────────────────────┐
│         App Component (Parent)          │
│  ┌─────────────────────────────────┐   │
│  │   app.component.html            │   │
│  │   app.component.ts              │   │
│  │   app.component.css             │   │
│  └─────────────────────────────────┘   │
│              │                          │
│              ├──────────┬──────────┐   │
│              ▼          ▼          ▼   │
│      ┌────────────┐ ┌────────────┐ ┌─────────┐
│      │ Header     │ │  Content   │ │ Footer  │
│      │ Component  │ │  Component │ │ Component│
│      └────────────┘ └────────────┘ └─────────┘
└─────────────────────────────────────────┘
```

**Example of Parent-Child Communication:**

```typescript
// parent.component.ts
export class ParentComponent {
  parentMessage: string = 'Message from Parent';
  
  receiveMessage(message: string) {
    console.log('Received from child:', message);
  }
}
```

```html
<!-- parent.component.html -->
<app-child 
  [childMessage]="parentMessage"
  (messageEvent)="receiveMessage($event)">
</app-child>
```

```typescript
// child.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

export class ChildComponent {
  @Input() childMessage: string;
  @Output() messageEvent = new EventEmitter<string>();
  
  sendMessage() {
    this.messageEvent.emit('Hello from Child!');
  }
}
```

---

## 2. index.html vs Component HTML

### index.html (Application Entry Point)

**Purpose:** Global configuration and single-page application setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyAngularApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  
  <!-- Global CSS Libraries -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">
  
  <!-- Global JavaScript Libraries -->
  <script src="https://cdn.example.com/library.js"></script>
</head>
<body>
  <!-- Angular App Root -->
  <app-root></app-root>
</body>
</html>
```

**What goes in index.html:**
- ✅ Global meta tags
- ✅ External CSS libraries (Bootstrap, Font Awesome)
- ✅ External JavaScript libraries
- ✅ Google Fonts
- ✅ Analytics scripts
- ✅ Favicon references
- ✅ The root component selector `<app-root>`

### Component HTML (App-Level Components)

**Purpose:** Application-specific templates and structure

```html
<!-- app.component.html -->
<div class="app-container">
  <app-header></app-header>
  
  <main class="content">
    <router-outlet></router-outlet>
  </main>
  
  <app-footer></app-footer>
</div>
```

**What goes in component HTML:**
- ✅ Application structure
- ✅ Child component selectors
- ✅ Router outlets
- ✅ Component-specific templates
- ✅ Data binding and directives

### Hierarchy Comparison

```
index.html (Global Level)
    │
    └── <app-root> (App Component - Parent)
            │
            ├── <app-header>
            ├── <app-sidebar>
            ├── <app-main-content>
            │       ├── <app-dashboard>
            │       ├── <app-user-list>
            │       └── <app-settings>
            └── <app-footer>
```

### Key Differences Table

| Aspect | index.html | Component HTML |
|--------|-----------|----------------|
| **Scope** | Global (entire app) | Component-specific |
| **Purpose** | Entry point, load resources | Build UI structure |
| **Contains** | Libraries, fonts, icons, scripts | Angular templates, directives |
| **Modified** | Rarely (only for global changes) | Frequently (app development) |
| **Examples** | Bootstrap CDN, Google Analytics | Component templates, data binding |
| **File Type** | Single static HTML file | Multiple template files |

---

## 3. Interpolation in Angular

### What is Interpolation?

Interpolation is a **one-way data binding** technique that binds data from the **component class** to the **view template** using double curly braces `{{ }}`.

### Data Flow

```
Component Class (TypeScript)  →  View Template (HTML)
     [Data Source]                  [Display]
```

### Basic Syntax

```typescript
// component.ts
export class AppComponent {
  title: string = 'Angular Interview Prep';
  count: number = 42;
  isEnabled: boolean = true;
}
```

```html
<!-- template.html -->
<h1>{{ title }}</h1>
<p>Count: {{ count }}</p>
<p>Status: {{ isEnabled }}</p>
```

**Output:**
```
Angular Interview Prep
Count: 42
Status: true
```

---

### Displaying Expression Results

**Q: Can you use interpolation to display the result of an expression directly?**

**Answer:** Yes! Interpolation can evaluate and display expressions.

```typescript
// component.ts
export class CalculatorComponent {
  num1: number = 5;
  num2: number = 10;
  price: number = 99.99;
  discount: number = 0.2;
}
```

```html
<!-- template.html -->
<!-- Arithmetic Operations -->
<p>Sum: {{ 5 + 5 }}</p>
<!-- Output: Sum: 10 -->

<p>Total: {{ num1 + num2 }}</p>
<!-- Output: Total: 15 -->

<p>Product: {{ num1 * num2 }}</p>
<!-- Output: Product: 50 -->

<!-- Mathematical Expressions -->
<p>Final Price: {{ price - (price * discount) }}</p>
<!-- Output: Final Price: 79.992 -->

<!-- Boolean Expressions -->
<p>Is Greater: {{ num2 > num1 }}</p>
<!-- Output: Is Greater: true -->
```

### Expression Examples Table

| Expression Type | Example | Result |
|----------------|---------|--------|
| Arithmetic | `{{ 10 + 20 }}` | 30 |
| Multiplication | `{{ 5 * 4 }}` | 20 |
| Division | `{{ 100 / 5 }}` | 20 |
| Comparison | `{{ 10 > 5 }}` | true |
| Logical | `{{ true && false }}` | false |

---

### Handling Undefined and Null Values

**Q: What happens if you interpolate an undefined or null value?**

**Answer:** Angular displays an **empty string** by default without throwing errors.

```typescript
// component.ts
export class SafeComponent {
  definedValue: string = 'Hello';
  undefinedValue: string;
  nullValue: string = null;
  emptyValue: string = '';
}
```

```html
<!-- template.html -->
<p>Defined: {{ definedValue }}</p>
<!-- Output: Defined: Hello -->

<p>Undefined: {{ undefinedValue }}</p>
<!-- Output: Undefined:  (empty) -->

<p>Null: {{ nullValue }}</p>
<!-- Output: Null:  (empty) -->

<p>Empty: {{ emptyValue }}</p>
<!-- Output: Empty:  (empty) -->
```

**Visual Representation:**

```
Value Type          Template Code              Browser Output
────────────────────────────────────────────────────────────
string "Hello"  →   {{ value }}           →    Hello
undefined       →   {{ value }}           →    (empty string)
null            →   {{ value }}           →    (empty string)
""              →   {{ value }}           →    (empty string)
0               →   {{ value }}           →    0
false           →   {{ value }}           →    false
```

**Safe Navigation Example:**

```typescript
export class UserComponent {
  user: any = null;
}
```

```html
<!-- Without safe navigation - might cause issues -->
<p>{{ user.name }}</p>

<!-- With safe navigation operator - safe -->
<p>{{ user?.name }}</p>
<!-- Output: (empty if user is null) -->

<!-- With default value -->
<p>{{ user?.name || 'Guest' }}</p>
<!-- Output: Guest (if user is null) -->
```

---

### String Concatenation with Interpolation

**Q: Can you perform string concatenation using interpolation?**

**Answer:** Yes! You can concatenate strings and use various expressions including ternary operators.

#### Basic String Concatenation

```typescript
// component.ts
export class ProfileComponent {
  firstName: string = 'John';
  lastName: string = 'Doe';
  age: number = 25;
  city: string = 'New York';
  country: string = 'USA';
}
```

```html
<!-- template.html -->

<!-- Concatenating strings -->
<p>{{ 'Hello ' + firstName }}</p>
<!-- Output: Hello John -->

<p>{{ firstName + ' ' + lastName }}</p>
<!-- Output: John Doe -->

<!-- Concatenating with variables -->
<p>{{ 'Welcome to ' + city + ', ' + country }}</p>
<!-- Output: Welcome to New York, USA -->

<!-- Complex concatenation -->
<p>{{ firstName + ' ' + lastName + ' is ' + age + ' years old' }}</p>
<!-- Output: John Doe is 25 years old -->
```

#### Ternary Expressions in Interpolation

```typescript
// component.ts
export class StatusComponent {
  age: number = 20;
  isLoggedIn: boolean = true;
  score: number = 85;
  temperature: number = 30;
  userRole: string = 'admin';
}
```

```html
<!-- template.html -->

<!-- Simple ternary -->
<p>Status: {{ isLoggedIn ? 'Online' : 'Offline' }}</p>
<!-- Output: Status: Online -->

<p>Category: {{ age > 18 ? 'Adult' : 'Minor' }}</p>
<!-- Output: Category: Adult -->

<!-- Nested ternary -->
<p>Grade: {{ score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F' }}</p>
<!-- Output: Grade: B -->

<!-- With concatenation -->
<p>{{ 'Temperature is ' + (temperature > 25 ? 'Hot' : 'Cold') }}</p>
<!-- Output: Temperature is Hot -->

<!-- Complex condition -->
<p>Access: {{ userRole === 'admin' ? 'Full Access' : userRole === 'editor' ? 'Edit Only' : 'Read Only' }}</p>
<!-- Output: Access: Full Access -->
```

#### Method Calls in Interpolation

```typescript
// component.ts
export class MethodComponent {
  userName: string = 'alice';
  message: string = 'hello world';
  items: string[] = ['apple', 'banana', 'orange'];
  
  getFormattedName(): string {
    return this.userName.toUpperCase();
  }
  
  getItemCount(): number {
    return this.items.length;
  }
}
```

```html
<!-- template.html -->

<!-- String methods -->
<p>{{ userName.toUpperCase() }}</p>
<!-- Output: ALICE -->

<p>{{ message.charAt(0).toUpperCase() + message.slice(1) }}</p>
<!-- Output: Hello world -->

<!-- Component methods -->
<p>{{ getFormattedName() }}</p>
<!-- Output: ALICE -->

<p>Items: {{ getItemCount() }}</p>
<!-- Output: Items: 3 -->

<!-- Array methods -->
<p>{{ items.join(', ') }}</p>
<!-- Output: apple, banana, orange -->
```

### String Concatenation Examples Table

| Scenario | Code | Output |
|----------|------|--------|
| Simple concat | `{{ 'Hello ' + name }}` | Hello John |
| Multiple variables | `{{ first + ' ' + last }}` | John Doe |
| With numbers | `{{ name + ' is ' + age }}` | John is 25 |
| Ternary | `{{ age > 18 ? 'Adult' : 'Minor' }}` | Adult |
| Method call | `{{ name.toUpperCase() }}` | JOHN |
| Complex | `{{ 'Mr. ' + (age > 50 ? 'Senior' : 'Junior') }}` | Mr. Junior |

---

### Complete Interpolation Examples

```typescript
// example.component.ts
export class ExampleComponent {
  // Basic values
  productName: string = 'Laptop';
  price: number = 999;
  inStock: boolean = true;
  quantity: number = 5;
  
  // Complex values
  discount: number = 0.15;
  rating: number = 4.5;
  reviews: number = 128;
  
  // Arrays and Objects
  tags: string[] = ['electronics', 'computers', 'sale'];
  seller: any = {
    name: 'Tech Store',
    verified: true
  };
  
  // Methods
  calculateFinalPrice(): number {
    return this.price - (this.price * this.discount);
  }
  
  getStockStatus(): string {
    return this.quantity > 0 ? 'In Stock' : 'Out of Stock';
  }
}
```

```html
<!-- example.component.html -->
<div class="product-card">
  <!-- Basic interpolation -->
  <h2>{{ productName }}</h2>
  
  <!-- Expression evaluation -->
  <p class="price">${{ price }}</p>
  <p class="discount">Save {{ discount * 100 }}%</p>
  
  <!-- Method calls -->
  <p class="final-price">Final Price: ${{ calculateFinalPrice() }}</p>
  
  <!-- Ternary expressions -->
  <p class="stock">{{ inStock ? 'Available' : 'Sold Out' }}</p>
  <p class="status">{{ getStockStatus() }}</p>
  
  <!-- Complex expressions -->
  <p class="urgency">{{ quantity < 10 ? 'Only ' + quantity + ' left!' : 'In Stock' }}</p>
  
  <!-- String concatenation -->
  <p class="rating">{{ rating + ' stars (' + reviews + ' reviews)' }}</p>
  
  <!-- Array operations -->
  <p class="tags">Tags: {{ tags.join(' • ') }}</p>
  
  <!-- Object properties -->
  <p class="seller">Sold by: {{ seller.name }} {{ seller.verified ? '✓' : '' }}</p>
  
  <!-- Mathematical operations -->
  <p class="total">Total Value: ${{ price * quantity }}</p>
  <p class="savings">You Save: ${{ (price * discount) * quantity }}</p>
</div>
```

---

## 4. Property Binding in Angular

### What is Property Binding?

Property binding is a **one-way data binding** technique that sets properties of HTML elements or directives **dynamically** from the component class using square brackets `[]`.

### Syntax

```html
<element [property]="expression">
```

### Data Flow

```
Component Class (TypeScript)  →  DOM Element Property
     [Data Source]                  [Property Value]
```

---

### Property Binding vs Interpolation

#### Key Difference: Data Type Handling

**Interpolation treats everything as STRING**  
**Property Binding preserves data types**

```typescript
// component.ts
export class ComparisonComponent {
  isDisabled: boolean = true;
  imageUrl: string = 'assets/logo.png';
  maxLength: number = 50;
  buttonText: string = 'Click Me';
}
```

#### Example 1: Boolean Values

```html
<!-- ❌ WRONG: Using Interpolation for Boolean -->
<button disabled="{{ isDisabled }}">Button</button>
<!-- Problem: "true" is a string, and ANY string (even "false") 
     in disabled attribute makes button disabled -->

<!-- ✅ CORRECT: Using Property Binding -->
<button [disabled]="isDisabled">Button</button>
<!-- Property binding passes actual boolean value -->
```

**Visual Demonstration:**

```
Interpolation (String):
────────────────────────────────────────
disabled="{{ false }}"  →  disabled="false"  →  DISABLED ❌
disabled="{{ true }}"   →  disabled="true"   →  DISABLED ❌
                         (attribute exists = disabled)

Property Binding (Boolean):
────────────────────────────────────────
[disabled]="false"  →  No attribute  →  ENABLED ✅
[disabled]="true"   →  disabled      →  DISABLED ✅
```

#### Example 2: Numeric Values

```typescript
export class FormComponent {
  maxChars: number = 100;
  minValue: number = 10;
  stepValue: number = 5;
}
```

```html
<!-- ❌ Interpolation: Number becomes string -->
<input maxlength="{{ maxChars }}">
<!-- maxChars is "100" (string) -->

<!-- ✅ Property Binding: Preserves number type -->
<input [maxlength]="maxChars">
<!-- maxChars is 100 (number) -->

<input [min]="minValue" [max]="100" [step]="stepValue" type="number">
```

#### Example 3: String Values (Both Work)

```typescript
export class ImageComponent {
  imageUrl: string = 'assets/images/profile.jpg';
  altText: string = 'User Profile';
}
```

```html
<!-- Both are acceptable for strings -->

<!-- Interpolation -->
<img src="{{ imageUrl }}" alt="{{ altText }}">

<!-- Property Binding -->
<img [src]="imageUrl" [alt]="altText">

<!-- Property binding is preferred for consistency -->
```

### When to Use What

```
┌─────────────────────────────────────────────────────┐
│             String Values Only?                      │
│                                                      │
│         YES → Use Interpolation {{ }}                │
│          OR → Property Binding []                    │
│                (both work, choose based on style)    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│     Boolean, Number, Object, Array values?          │
│                                                      │
│         MUST USE → Property Binding []               │
│              (Interpolation will fail)               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│          String Concatenation needed?                │
│                                                      │
│         USE → Interpolation {{ }}                    │
│         Example: {{ 'Hello ' + name }}               │
└─────────────────────────────────────────────────────┘
```

### Comparison Table

| Aspect | Interpolation `{{ }}` | Property Binding `[]` |
|--------|----------------------|----------------------|
| **Syntax** | `{{ value }}` | `[property]="value"` |
| **Data Type** | Always **STRING** | **Preserves type** (boolean, number, object, array) |
| **Use Case** | Display text, string concat | Set element properties with typed values |
| **Boolean** | ❌ Doesn't work properly | ✅ Works correctly |
| **Number** | ⚠️ Converts to string | ✅ Preserves number type |
| **Object/Array** | ❌ Won't work | ✅ Works perfectly |
| **Example** | `{{ username }}` | `[disabled]="true"` |
| **Best For** | Text content, concatenation | Properties, attributes, styles, classes |

---

### Binding DOM Attributes

**Q: Can you bind a DOM element's attribute using property binding?**

**Answer:** Yes! Use the `attr.` prefix to bind HTML attributes.

#### Syntax

```html
<element [attr.attribute-name]="expression">
```

#### Common Attribute Bindings

```typescript
// component.ts
export class AccessibilityComponent {
  buttonLabel: string = 'Submit Form';
  linkTitle: string = 'Go to Homepage';
  dataId: string = 'user-123';
  colspan: number = 3;
  ariaExpanded: boolean = false;
}
```

```html
<!-- template.html -->

<!-- ARIA attributes for accessibility -->
<button [attr.aria-label]="buttonLabel">
  <i class="icon-submit"></i>
</button>

<div [attr.aria-expanded]="ariaExpanded">
  Collapsible Content
</div>

<!-- Data attributes -->
<div [attr.data-id]="dataId" [attr.data-type]="'user'">
  User Card
</div>

<!-- Table attributes -->
<td [attr.colspan]="colspan">Merged Cell</td>

<!-- Link attributes -->
<a href="#" [attr.title]="linkTitle">Home</a>

<!-- Custom attributes -->
<input [attr.maxlength]="50" [attr.placeholder]="'Enter name'">
```

#### Why Use attr. Prefix?

```
Regular Property Binding:
────────────────────────────────
[disabled]="true"  →  DOM Property (element.disabled)

Attribute Binding:
────────────────────────────────
[attr.aria-label]="text"  →  HTML Attribute (setAttribute)
```

**When to use `attr.` prefix:**
- ✅ ARIA attributes (`aria-label`, `aria-expanded`, etc.)
- ✅ Data attributes (`data-*`)
- ✅ Custom attributes
- ✅ SVG attributes
- ✅ Table attributes (`colspan`, `rowspan`)
- ✅ Attributes without corresponding DOM properties

**When NOT to use `attr.` prefix:**
- ❌ Standard DOM properties (`disabled`, `value`, `src`, `href`)
- Use regular property binding instead: `[disabled]="true"`

### Attribute Binding Examples

```typescript
export class TableComponent {
  userName: string = 'John Doe';
  userRole: string = 'admin';
  isExpanded: boolean = false;
  columnSpan: number = 2;
  userId: number = 12345;
}
```

```html
<table>
  <tr>
    <!-- Colspan attribute -->
    <td [attr.colspan]="columnSpan">Header</td>
  </tr>
  <tr>
    <!-- Data attributes -->
    <td [attr.data-user-id]="userId" 
        [attr.data-role]="userRole">
      {{ userName }}
    </td>
  </tr>
</table>

<!-- Accessibility -->
<button 
  [attr.aria-label]="'Delete user ' + userName"
  [attr.aria-pressed]="isExpanded">
  Delete
</button>

<!-- SVG attributes -->
<svg>
  <circle [attr.cx]="50" 
          [attr.cy]="50" 
          [attr.r]="30">
  </circle>
</svg>
```

---

### Binding Multiple Properties

**Q: Can you bind multiple properties at once? If so, how?**

**Answer:** Yes! You can bind **as many properties as needed** to the same element. Each property is bound separately.

#### Multiple Property Binding Examples

```typescript
// component.ts
export class FormComponent {
  // Input properties
  userName: string = 'john_doe';
  isReadOnly: boolean = true;
  maxLength: number = 50;
  placeholderText: string = 'Enter your username';
  isRequired: boolean = true;
  
  // Styling
  textColor: string = '#333';
  fontSize: string = '16px';
  hasError: boolean = false;
  
  // Image properties
  imageUrl: string = 'assets/profile.jpg';
  imageAlt: string = 'User Profile Picture';
  imageWidth: number = 200;
  imageHeight: number = 200;
}
```

#### Example 1: Input Element

```html
<!-- Binding multiple properties to input -->
<input 
  [value]="userName"
  [disabled]="isReadOnly"
  [placeholder]="placeholderText"
  [required]="isRequired"
  [maxlength]="maxLength"
  [class.error]="hasError"
  [style.color]="textColor"
  [style.font-size]="fontSize"
  type="text">
```

**Breakdown:**

```
Property Bindings on Single Input:
────────────────────────────────────────────────────
[value]           →  Sets input value
[disabled]        →  Enables/disables input
[placeholder]     →  Sets placeholder text
[required]        →  Makes field required
[maxlength]       →  Limits character count
[class.error]     →  Adds 'error' class if true
[style.color]     →  Sets text color
[style.font-size] →  Sets font size
```

#### Example 2: Image Element

```html
<!-- Binding multiple properties to image -->
<img 
  [src]="imageUrl"
  [alt]="imageAlt"
  [width]="imageWidth"
  [height]="imageHeight"
  [class.rounded]="true"
  [style.border]="'2px solid #ccc'"
  [attr.loading]="'lazy'">
```

#### Example 3: Button Element

```typescript
export class ButtonComponent {
  buttonText: string = 'Submit';
  isDisabled: boolean = false;
  buttonType: string = 'submit';
  isLoading: boolean = false;
  isPrimary: boolean = true;
  buttonWidth: string = '200px';
}
```

```html
<button
  [type]="buttonType"
  [disabled]="isDisabled || isLoading"
  [class.btn-primary]="isPrimary"
  [class.btn-loading]="isLoading"
  [style.width]="buttonWidth"
  [style.cursor]="isDisabled ? 'not-allowed' : 'pointer'"
  [attr.aria-label]="buttonText"
  [attr.aria-busy]="isLoading">
  {{ buttonText }}
</button>
```

#### Example 4: Complex Component Binding

```typescript
export class CardComponent {
  // Card data
  title: string = 'Product Card';
  description: string = 'Amazing product description';
  price: number = 99.99;
  
  // States
  isOnSale: boolean = true;
  isFeatured: boolean = true;
  isAvailable: boolean = true;
  
  // Styling
  cardBgColor: string = '#f5f5f5';
  cardPadding: string = '20px';
  borderColor: string = '#ddd';
}
```

```html
<div
  [class.card]="true"
  [class.sale]="isOnSale"
  [class.featured]="isFeatured"
  [class.unavailable]="!isAvailable"
  [style.background-color]="cardBgColor"
  [style.padding]="cardPadding"
  [style.border]="'1px solid ' + borderColor"
  [attr.data-product-id]="123"
  [attr.data-available]="isAvailable">
  
  <h3 [style.color]="isFeatured ? '#ff6b00' : '#333'">
    {{ title }}
  </h3>
  
  <p [innerHTML]="description"></p>
  
  <span 
    [class.price]="true"
    [class.discounted]="isOnSale"
    [style.font-weight]="'bold'"
    [style.color]="isOnSale ? 'red' : 'black'">
    ${{ price }}
  </span>
</div>
```

### Multiple Property Binding Categories

```
┌────────────────────────────────────────────────┐
│         Types of Property Bindings             │
├────────────────────────────────────────────────┤
│                                                │
│  1. DOM Properties                             │
│     [value], [disabled], [src], [href]         │
│                                                │
│  2. Class Bindings                             │
│     [class.className]="boolean"                │
│                                                │
│  3. Style Bindings                             │
│     [style.property]="value"                   │
│                                                │
│  4. Attribute Bindings                         │
│     [attr.attribute-name]="value"              │
│                                                │
│  5. Component Properties (@Input)              │
│     [childProperty]="parentValue"              │
│                                                │
└────────────────────────────────────────────────┘
```

### Complete Example: Product Card

```typescript
// product-card.component.ts
export class ProductCardComponent {
  productName: string = 'Wireless Headphones';
  productImage: string = 'assets/headphones.jpg';
  price: number = 149.99;
  originalPrice: number = 199.99;
  rating: number = 4.5;
  inStock: boolean = true;
  isFeatured: boolean = true;
  isOnSale: boolean = true;
  stockCount: number = 15;
  
  getBadgeText(): string {
    if (this.isOnSale) return 'SALE';
    if (this.isFeatured) return 'FEATURED';
    return '';
  }
  
  getDiscountPercent(): number {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
}
```

```html
<!-- product-card.component.html -->
<div 
  class="product-card"
  [class.featured]="isFeatured"
  [class.on-sale]="isOnSale"
  [class.out-of-stock]="!inStock"
  [style.opacity]="inStock ? '1' : '0.6'"
  [attr.data-product]="productName">
  
  <!-- Product Image -->
  <img 
    [src]="productImage"
    [alt]="productName"
    [width]="300"
    [height]="300"
    [class.img-featured]="isFeatured"
    [style.border]="isFeatured ? '3px solid gold' : 'none'"
    [attr.loading]="'lazy'">
  
  <!-- Badge -->
  <span 
    [class.badge]="true"
    [class.badge-sale]="isOnSale"
    [class.badge-featured]="isFeatured && !isOnSale"
    [style.display]="isOnSale || isFeatured ? 'block' : 'none'">
    {{ getBadgeText() }}
  </span>
  
  <!-- Product Info -->
  <h3 [style.color]="isFeatured ? '#ff6b00' : '#333'">
    {{ productName }}
  </h3>
  
  <!-- Pricing -->
  <div class="pricing">
    <span 
      [class.current-price]="true"
      [style.color]="isOnSale ? 'red' : 'black'"
      [style.font-size]="'24px'"
      [style.font-weight]="'bold'">
      ${{ price }}
    </span>
    
    <span 
      [class.original-price]="true"
      [style.display]="isOnSale ? 'inline' : 'none'"
      [style.text-decoration]="'line-through'"
      [style.color]="'#999'">
      ${{ originalPrice }}
    </span>
    
    <span 
      [class.discount-badge]="true"
      [style.display]="isOnSale ? 'inline' : 'none'"
      [style.background-color]="'red'"
      [style.color]="'white'"
      [style.padding]="'2px 8px'"
      [style.border-radius]="'4px'">
      {{ getDiscountPercent() }}% OFF
    </span>
  </div>
  
  <!-- Stock Status -->
  <p 
    [class.stock-info]="true"
    [style.color]="stockCount < 10 ? 'orange' : 'green'"
    [style.font-weight]="stockCount < 10 ? 'bold' : 'normal'">
    {{ inStock ? (stockCount < 10 ? 'Only ' + stockCount + ' left!' : 'In Stock') : 'Out of Stock' }}
  </p>
  
  <!-- Add to Cart Button -->
  <button
    [type]="'button'"
    [disabled]="!inStock"
    [class.btn]="true"
    [class.btn-primary]="inStock"
    [class.btn-disabled]="!inStock"
    [style.width]="'100%'"
    [style.padding]="'12px'"
    [style.cursor]="inStock ? 'pointer' : 'not-allowed'"
    [attr.aria-label]="'Add ' + productName + ' to cart'"
    [attr.aria-disabled]="!inStock">
    {{ inStock ? 'Add to Cart' : 'Out of Stock' }}
  </button>
</div>
```

### Summary: Multiple Property Binding

✅ **Yes, you can bind multiple properties**
✅ **Each binding is independent**
✅ **No limit on number of bindings**
✅ **Mix different binding types** (property, class, style, attribute)
✅ **Evaluated separately on each change detection cycle**

---

## Interview Tips

### How to Answer These Questions

1. **Component Architecture**
   - Start with definition
   - Mention the 4 files
   - Explain communication between components
   - Give practical example

2. **index.html vs Component HTML**
   - Clearly state scope difference
   - Use hierarchy diagram in explanation
   - Provide concrete examples of what goes where

3. **Interpolation**
   - Explain one-way binding
   - Show syntax clearly
   - Demonstrate with expressions
   - Mention null/undefined handling
   - Show string concatenation and ternary examples

4. **Property Binding**
   - Compare with interpolation (data type handling)
   - Show boolean example to highlight difference
   - Demonstrate attribute binding with aria-label
   - Explain multiple property binding with examples

### Key Points to Remember

```
✓ Components = Building blocks (HTML + TS + CSS + Spec)
✓ index.html = Global, app.component.html = App-specific
✓ Interpolation {{ }} = String output, one-way binding
✓ Property Binding [] = Typed values, one-way binding
✓ Interpolation for strings, Property binding for non-strings
✓ Multiple properties can be bound independently
✓ Use attr. prefix for HTML attributes
```

---

## Quick Reference

### Syntax Comparison

| Feature | Syntax | Example |
|---------|--------|---------|
| **Interpolation** | `{{ expression }}` | `{{ userName }}` |
| **Property Binding** | `[property]="value"` | `[disabled]="true"` |
| **Attribute Binding** | `[attr.name]="value"` | `[attr.aria-label]="text"` |
| **Class Binding** | `[class.className]="boolean"` | `[class.active]="isActive"` |
| **Style Binding** | `[style.property]="value"` | `[style.color]="'red'"` |

### Decision Tree

```
Need to display data?
│
├─ Just text/string? → Use {{ }}
│
├─ Boolean/Number/Object? → Use []
│
├─ String concatenation? → Use {{ }}
│
└─ Set element property? → Use []
```

---

**End of Guide**
