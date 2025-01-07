# Memento

<b>Memento</b> (або "Знімок") — це поведінковий шаблон проєктування, який дозволяє зберігати й відновлювати попередній стан об’єкта, не розкриваючи деталей його внутрішньої реалізації.

Цей підхід стане у нагоді, якщо:
  - Необхідно зберігати поточний стан об’єкта (або його частини), щоб пізніше повернути його до цього самого стану.
  - Отримання стану напряму може розкрити внутрішню реалізацію об’єкта, порушуючи принцип інкапсуляції.

Далі буде продемонстровано приклад використання цього патерну в проєкті на TypeScript.

```ts
const DEFAULT_MONTHLY_EXPENSES_LIMIT = 0;

interface Memento<T> {
  readonly state: T;
  readonly name: string;
  readonly date: Date;
}

interface EmployeeState {
  salary: number;
  monthlyExpensesLimit: number;
}

class EmployeeOriginator {
  private _name: string;
  private _salary: number;
  private _monthlyExpensesLimit: number;

  constructor(name: string, salary: number) {
    this._name = name;
    this._salary = salary;
    this._monthlyExpensesLimit = DEFAULT_MONTHLY_EXPENSES_LIMIT;
  }

  get name() {
    return this._name;
  }
  get salary() {
    return this._salary;
  }

  public raiseSalaryTo(newSalary: number) {
    this._salary = newSalary;
  }

  public raiseLimitTo(newLimit: number) {
    this._monthlyExpensesLimit = newLimit;
  }

  public saveSnapshot(): Memento<EmployeeState> {
    return new EmployeeMemento({
      salary: this._salary,
      monthlyExpensesLimit: this._monthlyExpensesLimit,
    });
  }

  public restore(memento: Memento<EmployeeState>): void {
    this._salary = memento.state.salary;
    this._monthlyExpensesLimit = memento.state.monthlyExpensesLimit;
    console.log(`Originator: Restored state from memento: ${memento.name}`);
  }

  public showState(): void {
    console.log(`Employee: State for ${this.name} is salary=${this._salary} and monthlyExpensesLimit=${this._monthlyExpensesLimit}`);
  }
}

class EmployeeMemento implements Memento<EmployeeState> {
  private _state: EmployeeState;
  private _date: Date;
  private _name: string;

  constructor(state: EmployeeState) {
    this._state = state;
    this._date = new Date();
    this._name = `date=${this._date.toISOString().substring(0, 10)}, salary=${this._state.salary}, limit=${this._state.monthlyExpensesLimit}`;
  }

  get state() {
    return this._state;
  }
  get name() {
    return this._name;
  }
  get date() {
    return this._date;
  }
}

class EmployeeCaretaker {
  private _employeeMementos: Memento<EmployeeState>[] = [];

  private _employee: EmployeeOriginator;

  constructor(employee: EmployeeOriginator) {
    this._employee = employee;
  }

  public backup(): void {
    console.log('Employee caretaker: Saving employee\'s state...');
    this._employeeMementos.push(this._employee.saveSnapshot());
  }

  public undo(): void {
    if (!this._employeeMementos.length) {
      return;
    }
    
    const employeeMementoToRestore = this._employeeMementos.pop();

    if (!employeeMementoToRestore) {
      return
    }

    console.log(`Employee caretaker: Restoring memento: ${employeeMementoToRestore.name}`);
    this._employee.restore(employeeMementoToRestore);
  }

  public showHistory(): void {
    if (!this._employeeMementos.length) {
      console.log('Empty employee mementos list');
    }
    for (const memento of this._employeeMementos) {
      console.log(memento.name);
    }
  }
}


console.log('Client: Creating employee originator and caretaker...');
const originator = new EmployeeOriginator('Justin Case', 50000);
const caretaker = new EmployeeCaretaker(originator);

console.log('\nClient: Let\'s change states saving state before each change...');
caretaker.backup();

originator.raiseSalaryTo(60000);
caretaker.backup();

originator.raiseLimitTo(100);
caretaker.backup();

originator.raiseSalaryTo(100000);

console.log('\nClient: This is the history of mementos and the state of the originator:');
caretaker.showHistory();
originator.showState();

console.log('\nClient: Changed state up to 3 times, let\'s rollback to the initial state!');
caretaker.undo();
originator.showState();
caretaker.undo();
originator.showState();
caretaker.undo();
originator.showState();

console.log('\nClient: Now the history of mementos should be empty');
caretaker.showHistory();

console.log('\nClient: A new undo will leave the employee untouched');
caretaker.undo();
originator.showState();
```

## Переваги
  - Зберігає інкапсуляцію об'єкта, оскільки стан об’єкта зберігається без розкриття його внутрішніх деталей.
  - Спрощує дизайн об'єкта, оскільки йому не потрібно самостійно керувати історією станів.

## Недоліки
  - Може споживати значну кількість пам’яті, якщо знімки створюються занадто часто.
  - Створює додаткове навантаження на пам’ять, якщо старі знімки не звільняються вчасно.

Таким чином патерн "Знімок" дозволяє створювати необмежену кількість копій стану об’єкта та зберігати їх незалежно від самого об’єкта. Це особливо корисно для функціоналу скасування змін (Undo) або транзакцій, коли потрібно «відкотити» об’єкт до попереднього стану у разі невдалої операції.
