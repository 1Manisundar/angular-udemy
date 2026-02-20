# Angular Interview Preparation Guide
**Complete Q&A Guide for Frontend/Fullstack Interviews**

---

## Table of Contents
1. [Component-Based Architecture & File Structure](#1-component-based-architecture--file-structure)
2. [Interpolation](#2-interpolation)
3. [Property Binding vs Interpolation](#3-property-binding-vs-interpolation)
4. [Event Binding](#4-event-binding)
5. [The Event Object](#5-the-event-object)
6. [Two-Way Binding](#6-two-way-binding)
7. [ngIf Directive](#7-ngif-directive)
8. [ngFor Directive](#8-ngfor-directive)
9. [ngSwitch & ngSwitchCase](#9-ngswitch--ngswitchcase)
10. [ng-template vs ng-container](#10-ng-template-vs-ng-container)
11. [ngTemplateOutlet Directive](#11-ngtemplateoutlet-directive)
12. [ngOnChanges Hook](#12-ngonchanges-hook)
13. [SimpleChanges Interface](#13-simplechanges-interface)
14. [ngOnInit vs Constructor](#14-ngoninit-vs-constructor)
15. [ngDoCheck Hook](#15-ngdocheck-hook)
16. [ngAfterContentInit Hook](#16-ngaftercontentinit-hook)
17. [ngAfterViewInit Hook](#17-ngafterviewinit-hook)
18. [@Input Decorator](#18-input-decorator)
19. [@Output & EventEmitter](#19-output--eventemitter)
20. [@ViewChild Decorator](#20-viewchild-decorator)
21. [@ViewChild vs @ContentChild](#21-viewchild-vs-contentchild)

---

## 1. Component-Based Architecture & File Structure

### Q1: What is a component-based architecture in Angular?

**Answer:**
Component-based architecture is a design approach where the application is built using **components** as the basic building blocks. Each component is self-contained and encapsulates its own:
- HTML template (view)
- TypeScript logic (controller)
- CSS styling (styles)

Components can communicate with each other and be nested to create complex UIs.

**Example:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userName: string = 'John Doe';
  userEmail: string = 'john@example.com';
  
  updateProfile() {
    console.log('Profile updated');
  }
}
```

---

### Q2: What files does any basic Angular component have?

**Answer:**
When you create a new component using Angular CLI (`ng generate component component-name`), it creates **4 files**:

1. **component-name.component.ts** - TypeScript file with component logic
2. **component-name.component.html** - HTML template file
3. **component-name.component.css** - Stylesheet file
4. **component-name.component.spec.ts** - Unit testing file

**Example:**
```bash
ng generate component user-card

# Creates:
# user-card/
#   ├── user-card.component.ts
#   ├── user-card.component.html
#   ├── user-card.component.css
#   └── user-card.component.spec.ts
```

---

### Q3: Differentiate between index.html and component.html

**Answer:**

**index.html:**
- Entry point of the Angular application (Single Page Application)
- Located in the `src` folder
- Contains global elements: meta tags, fonts, external libraries, icons
- Hosts the root component `<app-root></app-root>`
- Loaded **once** when the application starts

**app.component.html (or any component.html):**
- Template for individual components
- Contains component-specific HTML structure
- Multiple component.html files exist in an application
- The app.component.html serves as the parent template where other components are rendered

**Example - index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Angular App</title>
  <link rel="stylesheet" href="https://cdn.example.com/bootstrap.css">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

**Example - app.component.html:**
```html
<header>
  <app-navbar></app-navbar>
</header>
<main>
  <router-outlet></router-outlet>
</main>
<footer>
  <app-footer></app-footer>
</footer>
```

---

## 2. Interpolation

### Q1: What is interpolation in Angular and how does it work?

**Answer:**
Interpolation is a data binding technique that displays component data in the template using **double curly braces** `{{ }}`. It binds data from the TypeScript class to the HTML view.

**Syntax:** `{{ expression }}`

**Example:**
```typescript
export class AppComponent {
  title = 'My Angular App';
  currentYear = 2024;
  userName = 'Alice';
}
```

```html
<h1>{{ title }}</h1>
<p>Welcome, {{ userName }}!</p>
<footer>© {{ currentYear }}</footer>
```

---

### Q2: Can we use interpolation and display the result of an expression directly?

**Answer:**
Yes, interpolation can evaluate and display expressions directly in the template.

**Example:**
```typescript
export class CalculatorComponent {
  num1 = 5;
  num2 = 10;
}
```

```html
<p>Sum: {{ 5 + 5 }}</p>
<!-- Output: Sum: 10 -->

<p>Product: {{ num1 * num2 }}</p>
<!-- Output: Product: 50 -->
```

---

### Q3: What happens if you try to interpolate an undefined or null value?

**Answer:**
Angular displays an **empty string** by default when interpolating `undefined` or `null` values. No error is thrown.

**Example:**
```typescript
export class DataComponent {
  userName: string | undefined;
  userEmail: string | null = null;
}
```

```html
<p>Name: {{ userName }}</p>      <!-- Output: Name:  -->
<p>Email: {{ userEmail }}</p>    <!-- Output: Email:  -->
```

---

### Q4: Can you perform string concatenation using interpolation?

**Answer:**
Yes, you can concatenate strings using the `+` operator or by combining variables and strings.

**Example:**
```typescript
export class GreetingComponent {
  firstName = 'John';
  lastName = 'Doe';
  greeting = 'Hello';
}
```

```html
<p>{{ greeting + ', ' + firstName + ' ' + lastName + '!' }}</p>
<!-- Output: Hello, John Doe! -->

<p>Full Name: {{ firstName + ' ' + lastName }}</p>
<!-- Output: Full Name: John Doe -->
```

---

## 3. Property Binding vs Interpolation

### Q1: What is property binding and how is it different from interpolation?

**Answer:**
Property binding sets an element's property to a component value using **square brackets** `[]`.

**Key Differences:**

| Feature | Interpolation | Property Binding |
|---------|--------------|------------------|
| Syntax | `{{ value }}` | `[property]="value"` |
| Data Type | Always string | Preserves data type |
| Use Case | Display text | Set element properties |

**Example:**
```typescript
export class FormComponent {
  isDisabled = true;
  buttonText = 'Submit';
}
```

```html
<!-- Property Binding (Correct for boolean) -->
<button [disabled]="isDisabled">{{ buttonText }}</button>

<!-- Interpolation (Wrong for boolean) -->
<button disabled="{{ isDisabled }}">{{ buttonText }}</button>
<!-- Button stays disabled even when isDisabled is false! -->
```

---

### Q2: Can you bind a DOM element's attribute using property binding?

**Answer:**
Yes, using the `attr.` prefix for attributes that don't have DOM property equivalents.

**Syntax:** `[attr.attribute-name]="value"`

**Example:**
```typescript
export class AccessibleComponent {
  ariaLabel = 'Close dialog';
  ariaExpanded = true;
}
```

```html
<button 
  [attr.aria-label]="ariaLabel"
  [attr.aria-expanded]="ariaExpanded">
  Close
</button>

<!-- Rendered output: -->
<!-- <button aria-label="Close dialog" aria-expanded="true">Close</button> -->
```

---

### Q3: What happens if you use interpolation instead of property binding for a boolean attribute?

**Answer:**
Using interpolation for boolean attributes treats the value as a **string**, causing unexpected behavior.

**Example:**
```typescript
export class FormComponent {
  isDisabled = false;
}
```

```html
<!-- WRONG: Using interpolation -->
<button disabled="{{ isDisabled }}">Submit</button>
<!-- Renders: <button disabled="false">Submit</button> -->
<!-- Button is STILL DISABLED because attribute exists -->

<!-- CORRECT: Using property binding -->
<button [disabled]="isDisabled">Submit</button>
<!-- No disabled attribute when false - button is enabled -->
```

---

### Q4: Can you bind multiple properties at once?

**Answer:**
Yes, you can bind multiple properties to the same element.

**Example:**
```typescript
export class FormComponent {
  inputValue = 'Default text';
  isReadonly = true;
  maxLength = 50;
  placeholderText = 'Enter your name';
}
```

```html
<input 
  type="text"
  [value]="inputValue"
  [readonly]="isReadonly"
  [maxLength]="maxLength"
  [placeholder]="placeholderText">
```

---

## 4. Event Binding

### Q1: Explain the data flow in event binding

**Answer:**
In event binding, data flows from the **DOM to the component**. When a DOM event occurs (click, input, etc.), the bound method in the component is executed.

**Data Flow:** DOM Event → Component Method

**Example:**
```typescript
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
    console.log('Count:', this.count);
  }
}
```

```html
<div>
  <h2>Count: {{ count }}</h2>
  <button (click)="increment()">+</button>
</div>

<!-- Flow:
     1. User clicks button (DOM Event)
     2. increment() method called (Component)
     3. count property updated (Component)
     4. View updates automatically
-->
```

---

### Q2: Explain the difference between event binding and property binding

**Answer:**

**Property Binding:** Data flows from **Component → DOM**
- Syntax: `[property]="value"`
- Sets element properties

**Event Binding:** Data flows from **DOM → Component**
- Syntax: `(event)="method()"`
- Responds to user actions

**Example:**
```typescript
export class DemoComponent {
  buttonText = 'Click me';
  isDisabled = false;
  clickCount = 0;

  handleClick() {
    this.clickCount++;
    this.buttonText = `Clicked ${this.clickCount} times`;
  }
}
```

```html
<button 
  [disabled]="isDisabled"          <!-- Property Binding: Component → DOM -->
  (click)="handleClick()">         <!-- Event Binding: DOM → Component -->
  {{ buttonText }}
</button>
```

---

## 5. The Event Object

### Q1: What is the event object in Angular and when is it used?

**Answer:**
The event object is a DOM event object passed to event handlers containing information about the event (target element, mouse coordinates, keys pressed, etc.).

**Access using:** `$event`

**Example:**
```typescript
export class MouseTrackerComponent {
  mouseX = 0;
  mouseY = 0;

  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }
}
```

```html
<div (mousemove)="onMouseMove($event)">
  <p>Mouse X: {{ mouseX }}, Mouse Y: {{ mouseY }}</p>
</div>
```

---

### Q2: How do you use the event object to prevent default behavior?

**Answer:**
Use the `preventDefault()` method on the event object.

**Example:**
```typescript
export class LoginComponent {
  onSubmit(event: Event) {
    event.preventDefault(); // Prevents page reload
    
    console.log('Form submitted');
    // Custom submission logic
  }
}
```

```html
<form (submit)="onSubmit($event)">
  <input type="text" placeholder="Username">
  <button type="submit">Login</button>
</form>
```

---

### Q3: How would you access the value of an input field using the event object?

**Answer:**
Access using `event.target.value` after casting to `HTMLInputElement`.

**Example:**
```typescript
export class SearchComponent {
  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value;
    
    console.log('User typed:', searchTerm);
  }
}
```

```html
<input 
  type="text"
  (input)="onSearchInput($event)"
  placeholder="Search...">
```

---

### Q4: Can you pass additional arguments to an event handler along with the event object?

**Answer:**
Yes, you can pass multiple arguments including the event object.

**Example:**
```typescript
export class ButtonComponent {
  onClick(event: MouseEvent, message: string, id: number) {
    console.log('Event:', event);
    console.log('Message:', message);
    console.log('ID:', id);
  }
}
```

```html
<button (click)="onClick($event, 'Hello Angular', 42)">
  Click Me
</button>

<!-- Console Output:
     Event: PointerEvent {...}
     Message: Hello Angular
     ID: 42
-->
```

---

### Q5: What are some common use cases of the event object?

**Answer:**
Common use cases include:
1. Accessing input values
2. Preventing default actions
3. Stopping event propagation
4. Tracking mouse position
5. Handling keyboard events

**Example:**
```typescript
export class EventDemoComponent {
  // Accessing input values
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Value:', target.value);
  }

  // Preventing default
  onFormSubmit(event: Event) {
    event.preventDefault();
  }

  // Stopping propagation
  onChildClick(event: MouseEvent) {
    event.stopPropagation();
  }

  // Keyboard events
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      console.log('Escape pressed');
    }
  }
}
```

---

### Q6: Can the event object be used in Angular templates without explicitly passing it?

**Answer:**
**No**, the event object is NOT automatically available. You must explicitly pass `$event` to the event handler.

**Example:**
```typescript
export class EventComponent {
  handleClick(event: MouseEvent) {
    console.log('Event:', event);
  }
}
```

```html
<!-- INCORRECT: Event not passed -->
<button (click)="handleClick()">
  <!-- ERROR or undefined -->
</button>

<!-- CORRECT: Event explicitly passed -->
<button (click)="handleClick($event)">
  Click Me
</button>
```

---

## 6. Two-Way Binding

### Q1: What is two-way binding and why do we use it?

**Answer:**
Two-way binding synchronizes data between the component and view in **both directions**. Changes in the view update the component, and changes in the component update the view.

**Syntax:** `[(ngModel)]="property"`

**Why use it:**
- Creates interactive, responsive UIs
- Automatically syncs form inputs with component data
- Provides real-time data synchronization

**Example:**
```typescript
// app.module.ts - Import FormsModule
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  // ...
})
export class AppModule { }

// component.ts
export class UserFormComponent {
  username = '';
  email = '';
}
```

```html
<div>
  <input type="text" [(ngModel)]="username">
  <p>You entered: {{ username }}</p>
  
  <input type="email" [(ngModel)]="email">
  <p>Your email: {{ email }}</p>
</div>
```

---

### Q2: Why is FormsModule necessary for two-way binding?

**Answer:**
`FormsModule` provides the `ngModel` directive which enables two-way data binding. Without it, Angular won't recognize `ngModel` and will throw an error.

**Error without FormsModule:**
```
Can't bind to 'ngModel' since it isn't a known property of 'input'.
```

**Example:**
```typescript
// app.module.ts
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule  // Required for ngModel
  ]
})
export class AppModule { }
```

---

### Q3: Explain the ngModel directive

**Answer:**
`ngModel` is a directive that creates two-way data binding between form controls and component properties. It combines property binding `[ngModel]` and event binding `(ngModelChange)`.

**Behind the scenes:**
```html
<!-- Two-way binding -->
<input [(ngModel)]="name">

<!-- Is equivalent to: -->
<input [ngModel]="name" (ngModelChange)="name = $event">
```

**Example:**
```typescript
export class ContactFormComponent {
  name = '';
  email = '';
  country = 'USA';
}
```

```html
<form>
  <input type="text" [(ngModel)]="name" name="name">
  <input type="email" [(ngModel)]="email" name="email">
  
  <select [(ngModel)]="country" name="country">
    <option value="USA">USA</option>
    <option value="UK">UK</option>
    <option value="India">India</option>
  </select>
</form>

<p>Name: {{ name }}</p>
<p>Email: {{ email }}</p>
<p>Country: {{ country }}</p>
```

---

### Q4: Explain the difference between property binding, event binding, and two-way binding

**Answer:**

| Binding Type | Syntax | Data Flow | Use Case |
|--------------|--------|-----------|----------|
| Property Binding | `[property]="value"` | Component → View | Display data |
| Event Binding | `(event)="method()"` | View → Component | Handle actions |
| Two-Way Binding | `[(ngModel)]="property"` | Component ↔ View | Form inputs |

**Example:**
```typescript
export class BindingDemoComponent {
  username = 'John Doe';
  isDisabled = false;
  clickCount = 0;

  handleClick() {
    this.clickCount++;
  }
}
```

```html
<!-- Property Binding (Component → View) -->
<h1 [textContent]="username"></h1>
<button [disabled]="isDisabled">Submit</button>

<!-- Event Binding (View → Component) -->
<button (click)="handleClick()">Click ({{ clickCount }})</button>

<!-- Two-Way Binding (Component ↔ View) -->
<input type="text" [(ngModel)]="username">
```

---

### Q5: What are the potential pitfalls of using two-way data binding?

**Answer:**
Potential issues include:

1. **Tight Coupling** - Strong dependency between component and view
2. **Performance Issues** - Excessive use can cause performance degradation
3. **Debugging Challenges** - Harder to trace data changes
4. **State Management Complexity** - Can lead to unexpected mutations

**Better Alternatives:**
- Use **Reactive Forms** for complex forms
- Use **Signals** (Angular 16+) for state management
- Limit ngModel to simple forms

**Example:**
```typescript
// Better approach: Reactive Forms
import { FormBuilder, FormGroup } from '@angular/forms';

export class BetterFormComponent {
  userForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: [''],
      email: ['']
    });
  }
}
```

```html
<form [formGroup]="userForm">
  <input formControlName="username">
  <input formControlName="email">
</form>
```

---

### Q6: State the difference between one-way binding and two-way binding

**Answer:**

**One-Way Binding:**
- Data flows in **single direction**
- Types: Component → View (interpolation, property binding) or View → Component (event binding)
- Better performance
- Easier to debug

**Two-Way Binding:**
- Data flows in **both directions** simultaneously
- Syntax: `[(ngModel)]`
- More convenient but less control
- Can impact performance

**Example:**
```html
<!-- One-Way Binding (Manual) -->
<input 
  type="text" 
  [value]="searchTerm"
  (input)="searchTerm = $any($event.target).value">

<!-- Two-Way Binding (Automatic) -->
<input type="text" [(ngModel)]="searchTerm">

<!-- Both produce the same result -->
```

---

## 7. ngIf Directive

### Q1: What is the ngIf directive and how does it work?

**Answer:**
`ngIf` is a **structural directive** that conditionally adds or removes elements from the DOM based on a boolean expression.

**Syntax:** `*ngIf="condition"`

**Example:**
```typescript
export class UserComponent {
  isLoggedIn = false;
  userName = 'John Doe';
  
  login() {
    this.isLoggedIn = true;
  }
}
```

```html
<div *ngIf="isLoggedIn">
  <h2>Welcome back, {{ userName }}!</h2>
  <button (click)="logout()">Logout</button>
</div>

<div *ngIf="!isLoggedIn">
  <h2>Please log in</h2>
  <button (click)="login()">Login</button>
</div>
```

---

### Q2: What are the performance benefits of using ngIf over hiding with CSS?

**Answer:**
`ngIf` **removes elements from the DOM**, while CSS (`display: none`) just hides them.

**Performance Benefits:**
1. **DOM Removal** - Elements are removed, not hidden
2. **Memory Usage** - Frees memory when removed
3. **Event Listeners** - Listeners are destroyed
4. **Change Detection** - Angular doesn't check removed elements

**Example:**
```typescript
export class PerformanceComponent {
  showWithNgIf = false;
  showWithCSS = false;
}
```

```html
<!-- Using ngIf (Better Performance) -->
<div *ngIf="showWithNgIf">
  <!-- Removed from DOM when false -->
  <ul>
    <li *ngFor="let item of largeDataSet">{{ item }}</li>
  </ul>
</div>

<!-- Using CSS (Worse Performance) -->
<div [style.display]="showWithCSS ? 'block' : 'none'">
  <!-- Stays in DOM when hidden -->
  <ul>
    <li *ngFor="let item of largeDataSet">{{ item }}</li>
  </ul>
</div>
```

---

### Q3: Can you store the result of an ngIf condition in a local variable?

**Answer:**
Yes, using the `as` keyword to store the result in a local template variable.

**Syntax:** `*ngIf="condition as variableName"`

**Example:**
```typescript
export class UserComponent {
  user: { name: string; email: string } | null = null;
}
```

```html
<!-- Without 'as' - accessing user multiple times -->
<div *ngIf="user">
  <h2>{{ user.name }}</h2>
  <p>{{ user.email }}</p>
</div>

<!-- With 'as' - store in local variable -->
<div *ngIf="user as currentUser">
  <h2>{{ currentUser.name }}</h2>
  <p>{{ currentUser.email }}</p>
</div>

<!-- With async pipe (very useful) -->
<div *ngIf="user$ | async as user">
  <h2>{{ user.name }}</h2>
  <p>{{ user.email }}</p>
</div>
```

---

## 8. ngFor Directive

### Q1: What is the purpose of the ngFor directive and how is it used?

**Answer:**
`ngFor` is a **structural directive** used to iterate over collections (arrays) and dynamically generate HTML elements for each item.

**Syntax:** `*ngFor="let item of collection"`

**Example:**
```typescript
export class ProductListComponent {
  products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
  ];
}
```

```html
<div *ngFor="let product of products">
  <h3>{{ product.name }}</h3>
  <p>Price: ${{ product.price }}</p>
</div>
```

---

### Q2: Can we track the index with ngFor? If so, how?

**Answer:**
Yes, using the `index` keyword which provides the current index (0-based).

**Syntax:** `*ngFor="let item of items; let i = index"`

**Available variables:**
- `index` - Current index (0-based)
- `first` - Boolean, true if first item
- `last` - Boolean, true if last item
- `even` - Boolean, true if even index
- `odd` - Boolean, true if odd index

**Example:**
```typescript
export class ListComponent {
  items = ['Apple', 'Banana', 'Orange', 'Mango'];
}
```

```html
<!-- Basic index tracking -->
<ul>
  <li *ngFor="let item of items; let i = index">
    {{ i }}: {{ item }}
  </li>
</ul>
<!-- Output:
     0: Apple
     1: Banana
     2: Orange
     3: Mango
-->

<!-- User-friendly numbering -->
<ul>
  <li *ngFor="let item of items; let i = index">
    {{ i + 1 }}. {{ item }}
  </li>
</ul>
<!-- Output:
     1. Apple
     2. Banana
     3. Orange
     4. Mango
-->
```

---

### Q3: How can we optimize rendering in ngFor?

**Answer:**
Use the `trackBy` function to help Angular identify items by a unique identifier, so only changed items are re-rendered.

**Syntax:** `*ngFor="let item of items; trackBy: trackByFunction"`

**Example:**
```typescript
export class OptimizedComponent {
  items = [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
    { id: 3, name: 'Item 3', value: 300 }
  ];
  
  // trackBy function returns unique identifier
  trackByItemId(index: number, item: any): number {
    return item.id; // Track by id property
  }
  
  updateItems() {
    // Update specific item
    this.items = [
      { id: 1, name: 'Item 1', value: 100 },        // Unchanged - NOT re-rendered
      { id: 2, name: 'Item 2 Updated', value: 250 }, // Changed - re-rendered
      { id: 3, name: 'Item 3', value: 300 }         // Unchanged - NOT re-rendered
    ];
  }
}
```

```html
<!-- With trackBy - Only changed items re-rendered -->
<ul>
  <li *ngFor="let item of items; trackBy: trackByItemId">
    {{ item.name }} - ${{ item.value }}
  </li>
</ul>

<button (click)="updateItems()">Update Items</button>
```

---

### Q4: Can we use ngFor to iterate over nested arrays?

**Answer:**
Yes, you can nest `ngFor` directives to iterate over multi-dimensional arrays.

**Example:**
```typescript
export class MatrixComponent {
  matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
  ];
}
```

```html
<!-- Nested ngFor for 2D array -->
<div class="matrix">
  <div *ngFor="let row of matrix" class="matrix-row">
    <span *ngFor="let cell of row" class="matrix-cell">
      {{ cell }}
    </span>
  </div>
</div>

<!-- Output:
     1  2  3  4
     5  6  7  8
     9  10 11 12
-->
```

---

## 9. ngSwitch & ngSwitchCase

### Q1: What is the ngSwitch directive and how is it used?

**Answer:**
`ngSwitch` conditionally renders content based on matching expressions, similar to a `switch-case` statement.

**Syntax:**
```html
<container [ngSwitch]="expression">
  <element *ngSwitchCase="value1">Content 1</element>
  <element *ngSwitchCase="value2">Content 2</element>
  <element *ngSwitchDefault>Default Content</element>
</container>
```

**Example:**
```typescript
export class DashboardComponent {
  userRole: string = 'admin'; // Can be: 'admin', 'user', 'guest'
}
```

```html
<div [ngSwitch]="userRole">
  <div *ngSwitchCase="'admin'">
    <h3>Admin Panel</h3>
    <p>Full access granted</p>
  </div>
  
  <div *ngSwitchCase="'user'">
    <h3>User Dashboard</h3>
    <p>Limited access</p>
  </div>
  
  <div *ngSwitchCase="'guest'">
    <h3>Guest Access</h3>
    <p>Please log in</p>
  </div>
  
  <div *ngSwitchDefault>
    <h3>Unknown Role</h3>
  </div>
</div>
```

---

### Q2: Can you use multiple ngSwitchCase directives with the same value?

**Answer:**
No, you cannot have multiple `ngSwitchCase` with the same value. Angular will only render the **first matching case**.

---

### Q3: How does ngSwitchDefault work? Can you have multiple?

**Answer:**
`ngSwitchDefault` provides a fallback when no case matches. You can only have **ONE** `ngSwitchDefault` per `ngSwitch` container.

**Example:**
```typescript
export class PaymentComponent {
  paymentMethod = 'unknown';
}
```

```html
<div [ngSwitch]="paymentMethod">
  <div *ngSwitchCase="'credit'">💳 Credit Card</div>
  <div *ngSwitchCase="'debit'">🏦 Debit Card</div>
  <div *ngSwitchCase="'paypal'">🅿️ PayPal</div>
  
  <!-- Fallback for unrecognized methods -->
  <div *ngSwitchDefault>
    ❓ Unknown Payment Method
  </div>
</div>
```

---

### Q4: What's the difference between ngIf and ngSwitch?

**Answer:**

| Feature | ngIf | ngSwitch |
|---------|------|----------|
| Use Case | Boolean conditions | Multiple value matching |
| Syntax | `*ngIf="condition"` | `[ngSwitch]="expression"` |
| Best For | 2-3 conditions | 4+ conditions |

**Example:**
```html
<!-- ngIf - verbose with many conditions -->
<div *ngIf="userRole === 'admin'">Admin</div>
<div *ngIf="userRole === 'user'">User</div>
<div *ngIf="userRole === 'guest'">Guest</div>

<!-- ngSwitch - cleaner -->
<div [ngSwitch]="userRole">
  <div *ngSwitchCase="'admin'">Admin</div>
  <div *ngSwitchCase="'user'">User</div>
  <div *ngSwitchCase="'guest'">Guest</div>
</div>
```

---

## 10. ng-template vs ng-container

### Q1: What's the difference between ng-template and ng-container?

**Answer:**

**ng-template:**
- Defines a template that is **NOT rendered** by default
- Content is inactive until explicitly referenced
- Used with `*ngIf else`, `ngTemplateOutlet`

**ng-container:**
- A **grouping element** that renders immediately
- Acts as a wrapper without adding extra DOM elements
- Content inside is active and rendered directly

**Example:**
```html
<!-- ng-template - NOT rendered until used -->
<ng-template #myTemplate>
  <h2>This is INACTIVE until referenced</h2>
</ng-template>

<div *ngIf="showContent; else myTemplate">
  <h2>Primary content</h2>
</div>

<!-- ng-container - renders immediately -->
<ng-container *ngIf="showSection">
  <h2>Section Title</h2>
  <p>This renders immediately</p>
</ng-container>
```

---

## 11. ngTemplateOutlet Directive

### Q1: What is ngTemplateOutlet and how is it used?

**Answer:**
`ngTemplateOutlet` dynamically inserts an `ng-template` into the view at runtime, allowing template reuse.

**Syntax:**
```html
<ng-container *ngTemplateOutlet="templateRef; context: contextObject"></ng-container>
```

**Example:**
```html
<!-- Define template -->
<ng-template #userGreeting>
  <h2>Hello, User!</h2>
</ng-template>

<!-- Use in multiple places -->
<ng-container *ngTemplateOutlet="userGreeting"></ng-container>
<ng-container *ngTemplateOutlet="userGreeting"></ng-container>
```

---

### Q2: How can we pass data to a template using ngTemplateOutlet?

**Answer:**
Pass data using the `context` option with key-value pairs.

**Example:**
```typescript
export class ContextComponent {
  currentUser = 'John Doe';
  userRole = 'Admin';
}
```

```html
<!-- Template with context variables -->
<ng-template #userInfo let-name="userName" let-role="userRole">
  <h2>{{ name }}</h2>
  <p>Role: {{ role }}</p>
</ng-template>

<!-- Pass data via context -->
<ng-container *ngTemplateOutlet="userInfo; context: { 
  userName: currentUser, 
  userRole: userRole 
}">
</ng-container>
```

---

### Q3: Can we pass multiple values to ngTemplate?

**Answer:**
Yes, include multiple key-value pairs in the context object.

**Example:**
```typescript
export class MultiContextComponent {
  product = {
    name: 'Laptop',
    price: 1299,
    stock: 15
  };
}
```

```html
<ng-template #productCard 
  let-productName="name"
  let-productPrice="price"
  let-stockCount="stock">
  <h2>{{ productName }}</h2>
  <p>${{ productPrice }}</p>
  <p>Stock: {{ stockCount }}</p>
</ng-template>

<ng-container *ngTemplateOutlet="productCard; context: {
  name: product.name,
  price: product.price,
  stock: product.stock
}">
</ng-container>
```

---

### Q4: What happens if template reference is null or undefined?

**Answer:**
If the template reference is `null` or `undefined`, Angular will **not render anything**. The area will be left **empty** in the DOM.

---

## 12. ngOnChanges Hook

### Q1: What is the purpose of the ngOnChanges hook?

**Answer:**
`ngOnChanges` detects and responds to changes in **input properties** (properties decorated with `@Input`). It's called before `ngOnInit` and whenever input properties change.

**Example:**
```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export class ChildComponent implements OnChanges {
  @Input() message: string = '';
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called');
    
    if (changes['message']) {
      const change = changes['message'];
      console.log('Previous:', change.previousValue);
      console.log('Current:', change.currentValue);
    }
  }
}
```

---

### Q2: How does ngOnChanges differ from ngOnInit?

**Answer:**

| Feature | ngOnChanges | ngOnInit |
|---------|-------------|----------|
| When Called | Before ngOnInit + every input change | Once after first change detection |
| Frequency | Multiple times | Only once |
| Receives | SimpleChanges object | Nothing |
| Use For | Monitoring input changes | Initialization logic |

---

### Q3: Can ngOnChanges detect changes to non-input properties?

**Answer:**
**No**, `ngOnChanges` **ONLY** detects changes to properties decorated with `@Input`. It does NOT track regular component properties.

**Example:**
```typescript
export class PropertyDetectionComponent implements OnChanges {
  @Input() inputProperty: string = '';  // Tracked
  regularProperty: string = '';         // NOT tracked
  
  ngOnChanges(changes: SimpleChanges) {
    // Only 'inputProperty' appears in changes
  }
  
  updateRegular() {
    this.regularProperty = 'New value';
    // ngOnChanges NOT called
  }
}
```

---

## 13. SimpleChanges Interface

### Q1: What is SimpleChanges and what is its purpose?

**Answer:**
`SimpleChanges` is an interface that tracks changes to input properties, providing previous and current values.

**Structure:**
```typescript
interface SimpleChanges {
  [propName: string]: SimpleChange;
}

interface SimpleChange {
  previousValue: any;
  currentValue: any;
  firstChange: boolean;
}
```

**Example:**
```typescript
export class UserComponent implements OnChanges {
  @Input() userName: string = '';
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userName']) {
      const change = changes['userName'];
      console.log('Previous:', change.previousValue);
      console.log('Current:', change.currentValue);
      console.log('First Change?', change.firstChange);
    }
  }
}
```

---

### Q2: How do you access the previous value using SimpleChanges?

**Answer:**
Access using `changes['propertyName'].previousValue`.

**Example:**
```typescript
export class PriceTrackerComponent implements OnChanges {
  @Input() currentPrice: number = 0;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentPrice']) {
      const prevPrice = changes['currentPrice'].previousValue;
      const currPrice = changes['currentPrice'].currentValue;
      
      console.log(`Price changed: $${prevPrice} → $${currPrice}`);
    }
  }
}
```

---

### Q3: How to determine if value actually changed vs just reassigned?

**Answer:**
Compare `previousValue` and `currentValue`. If equal, the value hasn't truly changed.

**Example:**
```typescript
export class ChangeDetectorComponent implements OnChanges {
  @Input() searchTerm: string = '';
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      const prev = changes['searchTerm'].previousValue;
      const curr = changes['searchTerm'].currentValue;
      
      if (prev === curr) {
        console.log('Reassigned with same value');
      } else {
        console.log('Value actually changed');
      }
    }
  }
}
```

---

### Q4: What if input changes multiple times before change detection?

**Answer:**
If an input changes multiple times before change detection runs, `SimpleChanges` will **only capture the most recent change**. Intermediate values are lost.

**Example:**
```typescript
// parent.component.ts
export class ParentComponent {
  inputValue = 'Initial value';
  
  multipleUpdates() {
    this.inputValue = 'First update';
    this.inputValue = 'Second update';
    this.inputValue = 'Third update';
    // Only sees: 'Initial value' → 'Third update'
  }
}
```

---

### Q5: Can SimpleChanges detect nested property changes?

**Answer:**
**No**, `SimpleChanges` only detects changes to the **reference** of objects/arrays, not nested content.

**Example:**
```typescript
// parent.component.ts
export class ParentComponent {
  user = { name: 'John', age: 30 };
  
  // WILL trigger ngOnChanges (new reference)
  updateByReference() {
    this.user = { ...this.user, name: 'Jane' };
  }
  
  // Will NOT trigger ngOnChanges (same reference)
  updateInPlace() {
    this.user.name = 'Jane'; // No change detected
  }
}
```

---

## 14. ngOnInit vs Constructor

### Q1: Explain the difference between constructor and ngOnInit

**Answer:**

**Constructor:**
- Standard TypeScript class constructor
- Called first, before Angular setup
- Used for dependency injection
- Cannot access `@Input` properties (undefined)

**ngOnInit:**
- Angular lifecycle hook
- Called after Angular initialization
- Called once after component initialized
- Can access `@Input` properties

**Example:**
```typescript
export class ComponentLifecycle implements OnInit {
  @Input() userName: string = '';
  
  constructor() {
    console.log('1. Constructor');
    console.log('userName:', this.userName); // undefined
  }
  
  ngOnInit() {
    console.log('2. ngOnInit');
    console.log('userName:', this.userName); // available
  }
}
```

---

### Q2: Can you use ngOnInit to fetch API data? Why prefer it over constructor?

**Answer:**
**Yes**, `ngOnInit` is the **preferred** place for API calls.

**Why prefer ngOnInit:**
- Component is fully initialized
- Input properties are available
- Change detection is ready
- Services are injected and ready
- Best practice for initialization logic

**Example:**
```typescript
export class UserListComponent implements OnInit {
  users: any[] = [];
  
  constructor(private http: HttpClient) {
    // Only inject services
  }
  
  ngOnInit() {
    // Fetch data here
    this.fetchUsers();
  }
  
  fetchUsers() {
    this.http.get('api/users').subscribe(data => {
      this.users = data;
    });
  }
}
```

---

### Q3: Is ngOnInit called multiple times?

**Answer:**
**No**, `ngOnInit` is called **only once** during the component lifecycle.

---

### Q4: What happens if you access input properties in constructor?

**Answer:**
Input properties will be **undefined** in the constructor because Angular hasn't bound them yet.

**Example:**
```typescript
export class ChildComponent implements OnInit {
  @Input() inputValue: string = '';
  
  constructor() {
    console.log('Constructor:', this.inputValue); // undefined ❌
  }
  
  ngOnInit() {
    console.log('ngOnInit:', this.inputValue); // 'Hello' ✅
  }
}
```

---

## 15. ngDoCheck Hook

### Q1: What is ngDoCheck and when is it called?

**Answer:**
`ngDoCheck` allows custom change detection logic. It's called during **every** change detection cycle.

**When called:**
- Every change detection cycle
- Much more frequently than `ngOnChanges`
- After `ngOnChanges` (if inputs changed)
- Even when no inputs changed

**Example:**
```typescript
import { Component, DoCheck } from '@angular/core';

export class CheckComponent implements DoCheck {
  counter = 0;
  previousCounter = 0;
  
  ngDoCheck() {
    if (this.counter !== this.previousCounter) {
      console.log(`Counter changed: ${this.previousCounter} → ${this.counter}`);
      this.previousCounter = this.counter;
    }
  }
}
```

---

### Q2: How does ngOnChanges differ from ngDoCheck?

**Answer:**

| Feature | ngOnChanges | ngDoCheck |
|---------|-------------|-----------|
| Trigger | Only `@Input` changes | Every change detection |
| Frequency | Less frequent | Very frequent |
| Input Required | Yes | No |
| Data Received | SimpleChanges | Nothing |
| Performance | Better | Worse (use carefully) |

---

### Q3: How does ngDoCheck compare to default change detection?

**Answer:**
- **Default:** Automatically tracks property changes
- **ngDoCheck:** Provides manual override for custom logic

Use `ngDoCheck` when you need to detect changes Angular misses (deep object changes, external library changes).

---

### Q4: Can ngDoCheck replace ngOnChanges?

**Answer:**
**No**, they serve different purposes:
- `ngOnChanges`: Efficient for `@Input` tracking, provides SimpleChanges
- `ngDoCheck`: For custom detection, no SimpleChanges, runs frequently

---

### Q5: Practical use cases for ngDoCheck?

**Answer:**
1. Monitoring deep changes in objects/arrays
2. Tracking changes from external libraries
3. Manual state management
4. Custom change detection beyond Angular's scope

---

### Q6: How to detect array changes with ngDoCheck?

**Answer:**
Manually compare current array with previous copy.

**Example:**
```typescript
export class ArrayChangeComponent implements DoCheck {
  items: number[] = [1, 2, 3];
  previousItems: number[] = [...this.items];
  
  ngDoCheck() {
    // Check length
    if (this.items.length !== this.previousItems.length) {
      console.log('Array length changed');
    }
    
    // Check contents
    const hasContentChanged = this.items.some((item, index) => 
      item !== this.previousItems[index]
    );
    
    if (hasContentChanged) {
      console.log('Array content changed');
    }
    
    // Update previous state
    this.previousItems = [...this.items];
  }
  
  addItem() {
    this.items.push(this.items.length + 1);
  }
}
```

---

## 16. ngAfterContentInit Hook

### Q1: What is ngAfterContentInit?

**Answer:**
`ngAfterContentInit` is called **once** after Angular projects external content into the component via `<ng-content>`.

**When called:**
- Once after first `ngDoCheck`
- After content projection is complete
- Before view initialization

**Example:**
```typescript
import { Component, AfterContentInit } from '@angular/core';

export class ChildComponent implements AfterContentInit {
  ngAfterContentInit() {
    console.log('Projected content is now available');
  }
}
```

```html
<!-- child.component.html -->
<div class="child-container">
  <ng-content></ng-content>
</div>

<!-- parent.component.html -->
<app-child>
  <p>This content is projected</p>
</app-child>
```

---

### Q2: When to use ngAfterContentInit instead of ngOnInit?

**Answer:**
Use `ngAfterContentInit` when:
- Component uses `<ng-content>` (content projection)
- Need to access projected content
- Using `@ContentChild` or `@ContentChildren`

Use `ngOnInit` for:
- General initialization
- Fetching data
- No content projection

---

### Q3: What if projected content updates after ngAfterContentInit?

**Answer:**
`ngAfterContentInit` is called **only once**. For ongoing updates, use `ngAfterContentChecked`.

---

## 17. ngAfterViewInit Hook

### Q1: What is the purpose of ngAfterViewInit?

**Answer:**
`ngAfterViewInit` is called **once** after Angular fully initializes the component's view and child views.

**Purpose:**
- Access DOM elements using `@ViewChild`
- Interact with child components
- Perform DOM manipulations
- Initialize third-party libraries

**Example:**
```typescript
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

export class ViewInitComponent implements AfterViewInit {
  @ViewChild('myInput') inputElement!: ElementRef;
  
  ngAfterViewInit() {
    // View is ready - safe to access DOM
    this.inputElement.nativeElement.focus();
    this.inputElement.nativeElement.value = 'Initial value';
  }
}
```

```html
<input #myInput type="text">
```

---

### Q2: What's the difference between ngOnInit and ngAfterViewInit for DOM manipulation?

**Answer:**

| Feature | ngOnInit | ngAfterViewInit |
|---------|----------|-----------------|
| View Ready | ❌ No | ✅ Yes |
| DOM Access | ❌ Not safe | ✅ Safe |
| @ViewChild | ❌ Undefined | ✅ Available |
| Use For | Initialization | DOM manipulation |

---

### Q3: How to prevent 'Expression has changed' error in ngAfterViewInit?

**Answer:**
This error occurs when you update template-bound properties in `ngAfterViewInit`.

**Solutions:**

**1. Use setTimeout (most common):**
```typescript
ngAfterViewInit() {
  setTimeout(() => {
    this.contentHeight = this.contentDiv.nativeElement.offsetHeight;
  }, 0);
}
```

**2. Use ChangeDetectorRef:**
```typescript
constructor(private cdr: ChangeDetectorRef) {}

ngAfterViewInit() {
  this.divWidth = this.myDiv.nativeElement.offsetWidth;
  this.cdr.detectChanges();
}
```

---

## 18. @Input Decorator

### Q1: How to pass data from parent to child?

**Answer:**
Use `@Input()` decorator in child component with property binding in parent.

**Example:**
```typescript
// child.component.ts
export class ChildComponent {
  @Input() childMessage: string = '';
  @Input() childNumber: number = 0;
}

// parent.component.ts
export class ParentComponent {
  parentMessage = 'Hello from Parent!';
  parentNumber = 42;
}
```

```html
<!-- parent.component.html -->
<app-child
  [childMessage]="parentMessage"
  [childNumber]="parentNumber">
</app-child>

<!-- child.component.html -->
<p>{{ childMessage }}</p>
<p>{{ childNumber }}</p>
```

---

### Q2: Can you pass primitives and objects? How does change detection differ?

**Answer:**

**Primitives (string, number, boolean):**
- Pass by value
- Angular detects changes automatically

**Objects/Arrays:**
- Pass by reference
- Angular only detects reference changes
- Must create new object reference for change detection

**Example:**
```typescript
export class ParentComponent {
  user = { name: 'John', age: 30 };
  
  // Does NOT trigger change detection
  updateInPlace() {
    this.user.name = 'Jane';
  }
  
  // DOES trigger change detection
  updateByReference() {
    this.user = { ...this.user, name: 'Jane' };
  }
}
```

---

### Q3: Can you alias input property names?

**Answer:**
Yes, using `@Input('aliasName')`.

**Example:**
```typescript
// child.component.ts
export class ChildComponent {
  @Input('parentMessage') receiveMessage: string = '';
}
```

```html
<!-- parent.component.html -->
<app-child [parentMessage]="message"></app-child>

<!-- child.component.html -->
<p>{{ receiveMessage }}</p>
```

---

## 19. @Output & EventEmitter

### Q1: What is @Output and EventEmitter? How to pass data from child to parent?

**Answer:**
`@Output` with `EventEmitter` allows child components to emit events that parent components can listen to.

**Example:**
```typescript
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();
  
  sendMessage() {
    this.messageEvent.emit('Hello from Child!');
  }
}

// parent.component.ts
export class ParentComponent {
  receivedMessage = '';
  
  handleMessage(message: string) {
    this.receivedMessage = message;
  }
}
```

```html
<!-- parent.component.html -->
<app-child (messageEvent)="handleMessage($event)"></app-child>
<p>Received: {{ receivedMessage }}</p>

<!-- child.component.html -->
<button (click)="sendMessage()">Send to Parent</button>
```

---

## 20. @ViewChild Decorator

### Q1: What is the purpose of @ViewChild?

**Answer:**
`@ViewChild` provides access to:
- Child components
- DOM elements via template references
- Directives

**Example:**
```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

export class ParentComponent implements AfterViewInit {
  @ViewChild('myInput') inputElement!: ElementRef;
  
  ngAfterViewInit() {
    this.inputElement.nativeElement.focus();
  }
}
```

```html
<input #myInput type="text">
```

---

### Q2: Role of ngAfterViewInit with @ViewChild?

**Answer:**
`ngAfterViewInit` is the **earliest** hook where `@ViewChild` is guaranteed to be available.

**Lifecycle:**
1. Constructor - `@ViewChild` undefined
2. ngOnInit - `@ViewChild` undefined
3. **ngAfterViewInit** - `@ViewChild` available ✅

---

## 21. @ViewChild vs @ContentChild

### Q1: What's the difference?

**Answer:**

**@ViewChild:**
- Accesses component's **own template**
- Available in `ngAfterViewInit`

**@ContentChild:**
- Accesses **projected content** via `<ng-content>`
- Available in `ngAfterContentInit`

**Example:**
```typescript
// Component with @ContentChild
export class ChildComponent implements AfterContentInit {
  @ContentChild('projectedElement') projectedRef!: ElementRef;
  
  ngAfterContentInit() {
    console.log('Projected:', this.projectedRef.nativeElement);
  }
}

// Component with @ViewChild
export class ParentComponent implements AfterViewInit {
  @ViewChild('ownElement') ownRef!: ElementRef;
  
  ngAfterViewInit() {
    console.log('Own:', this.ownRef.nativeElement);
  }
}
```

```html
<!-- child.component.html -->
<div>
  <ng-content></ng-content>
</div>

<!-- parent.component.html -->
<p #ownElement>Own template</p>
<app-child>
  <p #projectedElement>Projected content</p>
</app-child>
```

---

### Q2: Which lifecycle hook is used with @ContentChild and why?

**Answer:**
`ngAfterContentInit` - ensures projected content is fully initialized before accessing it.

---

## Summary

This guide covers the essential Angular interview topics with:
- Clear, concise answers
- Practical code examples
- Key concepts highlighted
- Interview-ready format

**Good luck with your interviews!** 🎯




iq 24 : 

All right.

So let's discuss a few questions related to router outlet.

So first is what is router outlet and why is it important in angular.

So it is a directive that acts as a placeholder in your template where angular renders the component

for the active route.

It is essential because without it, angular won't be able to know where to inject the component associated

with the current route.

It tells angular where to display the routed component within the HTML structure of the application.

The next question where should router outlet typically be placed?

Can it be placed in components other than the root component?

So the router outlet is commonly placed in the root component, that is, the app component to display

components based on the top level routes.

However, it can be placed in any parent component.

This is particularly useful in nested routing scenarios where child routes are defined, or when you

are using named outlets to render multiple views on the same page.


iq 25: 

What is the router link directive and how does it differ from a standard HTML anchor tag?

The router link directive is used for in-app navigation between different components or views by updating

the URL.

It works in conjunction with Angular's router module to handle routing without causing a full page reload,

which enables client side routing with ease.

Unlike a standard HTML anchor tag, which causes the browser to reload the page, router link keeps

the application state intact and allows smooth transitions between routes.

