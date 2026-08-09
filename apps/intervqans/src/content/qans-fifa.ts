import type { Section } from "./types";

export const qansFifaSection: Section = {
  slug: "qans",
  title: "MatchDeck Q & Answers",
  tagline: "Three-a-side prep — React, Java, Angular.",
  emoji: "⚽",
  gradient: "from-[oklch(0.86_0.19_95)] via-[oklch(0.8_0.19_130)] to-[oklch(0.78_0.2_150)]",
  items: [
    // ── React ─────────────────────────────────────────────────────────────
    {
      id: "state-vs-props",
      category: "React",
      question: "What's the difference between state and props in React?",
      tags: ["React", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "**Props** are read-only inputs passed from a parent component to a child. **State** is data managed inside a component that can change over time.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Props are like a recipe card given to a chef — the chef reads it but doesn't modify it. State is like the pot on the stove — the chef can stir it and change what's inside.",
        },
      ],
    },
    {
      id: "what-problem-do-hooks-solve",
      category: "React",
      question: "What problem do Hooks solve?",
      tags: ["React", "Hooks"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Hooks let functional components use ==state, side effects, refs, and reusable stateful logic== without writing class components.",
        },
        {
          type: "text",
          content: "Common examples: `useState`, `useEffect`, `useRef`, `useContext`.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Hooks are like attachments you plug into a tool — add state when you need state, effects when you need effects, without changing the whole component structure.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Interviewer expectation:** Understand dependency arrays and reusable logic through custom Hooks.",
        },
      ],
    },
    {
      id: "usestate-in-react",
      category: "React",
      question: "What is `useState` in React?",
      tags: ["React", "Hooks"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "`useState` is a Hook used to store and update state inside a functional component. Updating state causes React to re-render the component.",
        },
        { type: "code", language: "tsx", content: "const [count, setCount] = useState(0);" },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Think of it like a scoreboard. When the score changes, the display updates automatically.",
        },
      ],
    },
    {
      id: "useeffect-in-react",
      category: "React",
      question: "What is `useEffect`?",
      tags: ["React", "Hooks"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "`useEffect` is used to synchronize a component with external systems, such as APIs, timers, subscriptions, or browser APIs.",
        },
        {
          type: "code",
          language: "tsx",
          content: `useEffect(() => {
  fetchData();
}, []);`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            '**Analogy:** It\'s like saying: "Once this screen is ready, perform this additional job."',
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Interviewer expectation:** Understand effects, dependency arrays, cleanup, and avoiding unnecessary or infinite executions.",
        },
      ],
    },
    {
      id: "what-is-virtual-dom",
      category: "React",
      question: "What is the Virtual DOM?",
      tags: ["React", "Rendering"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "The Virtual DOM is a lightweight JavaScript representation of the UI. React compares changes and efficiently updates the necessary parts of the real DOM.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Instead of rebuilding the entire house when one window changes, React identifies the window and updates what's necessary.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Interviewer expectation:** Understand why React can update UIs efficiently and the basic idea behind reconciliation.",
        },
      ],
    },
    {
      id: "why-keys-in-react-lists",
      category: "React",
      question: "Why do we use `key` in React lists?",
      tags: ["React", "Lists"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "A `key` gives each list item a stable identity, helping React determine which items were added, removed, moved, or updated.",
        },
        {
          type: "code",
          language: "tsx",
          content: `users.map(user =>
  <User key={user.id} user={user} />
)`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Think of students having unique student IDs. Even if they change seats, you still know exactly who is who.",
        },
      ],
    },

    // ── Java ──────────────────────────────────────────────────────────────
    {
      id: "equals-vs-double-equals",
      category: "Java",
      question: "What's the difference between `==` and `.equals()` in Java?",
      tags: ["Java", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "`==` compares references for objects — whether two variables point to the same object. `.equals()` compares logical content, when the class implements it appropriately.",
        },
        {
          type: "code",
          language: "java",
          content: `String a = new String("Java");
String b = new String("Java");

a == b;       // false
a.equals(b);  // true`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            '**Analogy:** `==` asks: "Are these the exact same book?" `.equals()` asks: "Do these books contain the same content?"',
        },
      ],
    },
    {
      id: "interface-vs-abstract-class",
      category: "Java",
      question: "What's the difference between an Interface and an Abstract Class?",
      tags: ["Java", "OOP"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "An interface mainly defines a contract — what a class should provide. An abstract class can provide both abstract behavior and shared implementation/state.",
        },
        {
          type: "code",
          language: "java",
          content: `interface Flyable {
    void fly();
}

abstract class Bird {
    void eat() {
        System.out.println("Eating");
    }
}`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** An interface is like a job description defining required skills. An abstract class is like a base employee handbook containing both rules and existing procedures.",
        },
      ],
    },
    {
      id: "overloading-vs-overriding",
      category: "Java",
      question: "What is method overloading vs method overriding?",
      tags: ["Java", "OOP"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "**Overloading:** Same method name, different parameters, usually in the same class. **Overriding:** A child class provides its own implementation of an inherited method.",
        },
        {
          type: "code",
          language: "java",
          content: `void print(String s) {}
void print(int n) {}       // Overloading`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Overloading = same employee handles different types of requests. Overriding = new manager changes how an inherited process is performed.",
        },
        {
          type: "callout",
          variant: "info",
          content: "**Interviewer expectation:** Understand compile-time polymorphism vs runtime polymorphism.",
        },
      ],
    },
    {
      id: "encapsulation",
      category: "Java",
      question: "What is Encapsulation?",
      tags: ["Java", "OOP"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Encapsulation means hiding internal data and controlling how it is accessed or modified, typically using `private` fields and methods.",
        },
        {
          type: "code",
          language: "java",
          content: `class Account {
    private double balance;

    public double getBalance() {
        return balance;
    }
}`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** An ATM lets you withdraw money through controlled operations instead of giving you direct access to the bank's database.",
        },
        {
          type: "callout",
          variant: "info",
          content: "**Interviewer expectation:** Understand data hiding, access modifiers, maintainability, and controlled access.",
        },
      ],
    },
    {
      id: "inheritance",
      category: "Java",
      question: "What is Inheritance?",
      tags: ["Java", "OOP"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content: "Inheritance allows one class to reuse and extend the behavior of another class using `extends`.",
        },
        {
          type: "code",
          language: "java",
          content: `class Vehicle {
    void start() {}
}

class Car extends Vehicle {
}`,
        },
        { type: "text", content: "`Car` inherits `start()` from `Vehicle`." },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** A child can inherit characteristics from a parent while also having its own characteristics.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Interviewer expectation:** Understand IS-A relationships, code reuse, overriding, and the limitations of inheritance.",
        },
      ],
    },
    {
      id: "polymorphism",
      category: "Java",
      question: "What is Polymorphism?",
      tags: ["Java", "OOP"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Polymorphism means the same interface or parent reference can represent different implementations, with the actual method determined at runtime.",
        },
        {
          type: "code",
          language: "java",
          content: `Animal animal = new Dog();
animal.sound();`,
        },
        { type: "text", content: "If `Dog` overrides `sound()`, the `Dog` implementation runs." },
        {
          type: "callout",
          variant: "tip",
          content:
            '**Analogy:** The same "Pay" button can perform different operations depending on whether you selected a credit card, PayPal, or another payment method.',
        },
        {
          type: "callout",
          variant: "info",
          content: "**Interviewer expectation:** Understand runtime polymorphism, method overriding, and dynamic method dispatch.",
        },
      ],
    },
    {
      id: "arraylist-vs-linkedlist",
      category: "Java",
      question: "What's the difference between `ArrayList` and `LinkedList`?",
      tags: ["Java", "Collections"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "`ArrayList` uses a dynamic array, making indexed access fast. `LinkedList` uses linked nodes, making certain insert/delete operations efficient once the position is known.",
        },
        { type: "code", language: "java", content: "List<String> names = new ArrayList<>();" },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** `ArrayList` is like numbered seats in a theater — easy to directly find seat 25. `LinkedList` is like a chain where each person knows the next person.",
        },
      ],
    },
    {
      id: "exception-handling-java",
      category: "Java",
      question: "What is Exception Handling in Java?",
      tags: ["Java", "Exceptions"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Exception handling allows an application to handle runtime problems gracefully using `try`, `catch`, `finally`, `throw`, and `throws`.",
        },
        {
          type: "code",
          language: "java",
          content: `try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Invalid operation");
}`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** It's like having an emergency exit plan. Something unexpected happens, but you have a controlled way to respond.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Interviewer expectation:** Understand `try-catch-finally`, propagation, and especially checked vs unchecked exceptions.",
        },
      ],
    },
    {
      id: "final-finally-finalize",
      category: "Java",
      question: "What's the difference between `final`, `finally`, and `finalize`?",
      tags: ["Java", "Keywords"],
      difficulty: "Medium",
      answer: [
        {
          type: "list",
          items: [
            "`final` → prevents reassignment, overriding, or inheritance depending on where it is used.",
            "`finally` → block associated with `try` that normally executes whether an exception occurs or not.",
            "`finalize()` → old GC-related mechanism that is deprecated and should not be used.",
          ],
        },
        {
          type: "code",
          language: "java",
          content: `final int MAX = 100;

try {
    // operation
} finally {
    // cleanup
}`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** `final` = locked. `finally` = cleanup before leaving. `finalize()` = an old cleanup mechanism Java has moved away from.",
        },
      ],
    },
    {
      id: "hashmap-vs-concurrenthashmap",
      category: "Java",
      question: "What is the difference between `HashMap` and `ConcurrentHashMap`?",
      tags: ["Java", "Concurrency"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "`HashMap` is not thread-safe. `ConcurrentHashMap` is designed for concurrent access by multiple threads without locking the entire map for ordinary operations.",
        },
        {
          type: "code",
          language: "java",
          content: `Map<String, Integer> map =
        new ConcurrentHashMap<>();`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** `HashMap` is like one shared notebook where multiple people writing simultaneously can cause problems. `ConcurrentHashMap` is like a well-organized shared system that allows multiple people to work safely at the same time.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Interviewer expectation:** Show that you understand thread safety, concurrency, and choosing the correct collection for multi-threaded applications.",
        },
      ],
    },

    // ── Angular ───────────────────────────────────────────────────────────
    {
      id: "what-is-angular",
      category: "Angular",
      question: "What is Angular?",
      tags: ["Angular", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Angular is a TypeScript-based frontend framework used to build dynamic, scalable web applications, especially Single Page Applications (SPAs).",
        },
        {
          type: "text",
          content:
            "It provides built-in features like components, routing, forms, dependency injection, and HTTP communication.",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Angular is like a complete construction toolkit — instead of buying every tool separately, most things you need are already included.",
        },
        {
          type: "callout",
          variant: "info",
          content: "**Interviewer expectation:** Understand that Angular is a full framework, not just a UI library.",
        },
      ],
    },
    {
      id: "angular-component",
      category: "Angular",
      question: "What is a Component in Angular?",
      tags: ["Angular", "Components"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "A component is the basic building block of an Angular application. It controls a portion of the UI using a TypeScript class, template, and styles.",
        },
        {
          type: "code",
          language: "typescript",
          content: `@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {}`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Think of a webpage as a LEGO structure. Header, sidebar, login form, and dashboard can each be separate LEGO blocks.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Interviewer expectation:** Understand component-based architecture, templates, selectors, and component responsibilities.",
        },
      ],
    },
    {
      id: "angular-data-binding",
      category: "Angular",
      question: "What is Data Binding in Angular?",
      tags: ["Angular", "Data Binding"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Data binding connects the component's TypeScript data with the HTML template. Common types are:",
        },
        {
          type: "list",
          items: [
            '**Interpolation** → `{{ name }}`',
            '**Property binding** → `[disabled]="isDisabled"`',
            '**Event binding** → `(click)="save()"`',
            '**Two-way binding** → `[(ngModel)]="name"`',
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Data binding is like a bridge between your TypeScript logic and what the user sees or does on the screen.",
        },
      ],
    },
    {
      id: "angular-dependency-injection",
      category: "Angular",
      question: "What is Dependency Injection in Angular?",
      tags: ["Angular", "DI"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Dependency Injection allows Angular to provide required services to components instead of components creating those dependencies themselves.",
        },
        {
          type: "code",
          language: "typescript",
          content: "constructor(private userService: UserService) {}",
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** A chef doesn't manufacture the refrigerator. The restaurant provides the refrigerator, and the chef simply uses it.",
        },
        {
          type: "callout",
          variant: "info",
          content: "**Interviewer expectation:** Understand services, providers, injectors, loose coupling, and testability.",
        },
      ],
    },
    {
      id: "angular-services",
      category: "Angular",
      question: "What are Services in Angular?",
      tags: ["Angular", "Services"],
      difficulty: "Easy",
      answer: [
        {
          type: "text",
          content:
            "Services contain shared business logic or reusable functionality such as API calls, authentication, logging, or shared data.",
        },
        {
          type: "code",
          language: "typescript",
          content: `@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers() {}
}`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** A service is like a central help desk. Multiple departments can use the same service instead of each department building its own.",
        },
        {
          type: "callout",
          variant: "info",
          content: "**Interviewer expectation:** Understand separation of concerns and sharing logic between components.",
        },
      ],
    },
    {
      id: "observable-vs-promise",
      category: "Angular",
      question: "What is the difference between Observable and Promise?",
      tags: ["Angular", "RxJS"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "A Promise generally resolves once with one result. An Observable can emit multiple values over time and provides operators for transforming, combining, and controlling asynchronous streams.",
        },
        {
          type: "code",
          language: "typescript",
          content: `this.http.get('/api/users')
  .subscribe(users => {
    console.log(users);
  });`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Promise = ordering one package and waiting for its delivery. Observable = subscribing to a YouTube channel — you can receive multiple updates until you unsubscribe.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Interviewer expectation:** Understand Angular's use of RxJS, subscriptions, operators, and asynchronous data streams.",
        },
      ],
    },
    {
      id: "angular-routing",
      category: "Angular",
      question: "What is Angular Routing?",
      tags: ["Angular", "Routing"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Angular Router allows navigation between different components without performing a full browser page reload.",
        },
        {
          type: "code",
          language: "typescript",
          content: `const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent }
];`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** It's like moving between rooms inside the same house instead of leaving the house and entering a new one every time.",
        },
        {
          type: "callout",
          variant: "info",
          content: "**Interviewer expectation:** Understand routes, `routerLink`, route parameters, guards, and lazy loading.",
        },
      ],
    },
    {
      id: "angular-lifecycle-hooks",
      category: "Angular",
      question: "What are Angular Lifecycle Hooks?",
      tags: ["Angular", "Lifecycle"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Lifecycle hooks allow us to execute logic at different stages of a component's lifecycle. Common hooks include:",
        },
        {
          type: "list",
          items: ["`ngOnInit()` → initialization", "`ngOnChanges()` → input changes", "`ngOnDestroy()` → cleanup"],
        },
        {
          type: "code",
          language: "typescript",
          content: `ngOnInit() {
  this.loadUsers();
}`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Think of a hotel stay: check-in → stay → check-out. Different activities happen at each stage.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Interviewer expectation:** Know when lifecycle hooks execute and what work belongs in each hook, especially initialization and cleanup.",
        },
      ],
    },
    {
      id: "angular-lazy-loading",
      category: "Angular",
      question: "What is Lazy Loading in Angular?",
      tags: ["Angular", "Performance"],
      difficulty: "Medium",
      answer: [
        {
          type: "text",
          content:
            "Lazy loading means loading application code only when the user needs it, rather than downloading the entire application upfront.",
        },
        {
          type: "code",
          language: "typescript",
          content: `{
  path: 'admin',
  loadComponent: () =>
    import('./admin/admin.component')
      .then(m => m.AdminComponent)
}`,
        },
        {
          type: "callout",
          variant: "tip",
          content:
            "**Analogy:** Netflix doesn't download every movie when you open the app. It loads what you need when you need it.",
        },
        {
          type: "callout",
          variant: "info",
          content:
            "**Interviewer expectation:** Understand that lazy loading helps improve initial load time, bundle size, and application performance.",
        },
      ],
    },
  ],
};
