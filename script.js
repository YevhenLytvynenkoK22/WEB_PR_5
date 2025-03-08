// Виведення результатів на сторінку
function logResult(result) {
    console.log(result);
    alert(typeof result === "object" ? JSON.stringify(result, null, 2) : result);
}

// Фільтрація та сортування товарів
function testFilterAndSort() {
    const products = [
        { name: "Телефон", category: "Електроніка", price: 12000 },
        { name: "Ноутбук", category: "Електроніка", price: 30000 },
        { name: "Миша", category: "Комп'ютерні аксесуари", price: 700 }
    ];
    const threshold = 5000;
    const result = products
        .filter(p => p.price > threshold)
        .sort((a, b) => a.price - b.price)
        .map(p => p.name);
    logResult(result);
}

// Пошук кращого студента
function testFindTopStudent() {
    const students = [
        { name: "Іван", grades: { math: 90, physics: 85, english: 88 } },
        { name: "Марія", grades: { math: 95, physics: 80, english: 92 } },
        { name: "Олексій", grades: { math: 85, physics: 87, english: 84 } }
    ];
    let bestStudent = students.map(s => ({
        name: s.name,
        avg: Object.values(s.grades).reduce((a, b) => a + b, 0) / Object.values(s.grades).length
    })).reduce((a, b) => a.avg > b.avg ? a : b);
    logResult(bestStudent);
}

// Групування замовлень за покупцями
function testGroupOrders() {
    const orders = [
        { userId: 1, amount: 150 },
        { userId: 2, amount: 200 },
        { userId: 1, amount: 300 },
        { userId: 3, amount: 100 }
    ];
    const result = orders.reduce((acc, { userId, amount }) => {
        acc[userId] = (acc[userId] || 0) + amount;
        return acc;
    }, {});
    logResult(result);
}

// Об'єднання списків співробітників
function testMergeEmployees() {
    const dept1 = ["Олег", "Ірина", "Марія"];
    const dept2 = ["Марія", "Антон", "Олег", "Андрій"];
    const result = [...new Set([...dept1, ...dept2])].sort();
    logResult(result);
}

// Найдовша послідовність чисел
function testFindLongestSequence() {
    const nums = [100, 4, 200, 1, 3, 2];
    const set = new Set(nums);
    let longest = [];

    nums.forEach(num => {
        if (!set.has(num - 1)) {
            let currNum = num;
            let sequence = [];
            while (set.has(currNum)) {
                sequence.push(currNum);
                currNum++;
            }
            if (sequence.length > longest.length) longest = sequence;
        }
    });

    logResult(longest);
}

// Аналіз унікальних IP
function testUniqueIPs() {
    const ips = ["192.168.1.1", "192.168.1.2", "192.168.1.1", "192.168.1.3", "192.168.1.2", "192.168.1.2"];
    const uniqueIPs = new Set(ips);
    logResult([...uniqueIPs]);
}

// Перетин множин
function testCommonTags() {
    const user1 = { name: "Іван", tags: ["спорт", "музика", "технології"] };
    const user2 = { name: "Марія", tags: ["музика", "книги", "технології"] };

    const commonTags = user1.tags.filter(tag => user2.tags.includes(tag));
    logResult(commonTags);
}

// Індексація книг
function testBookIndexing() {
    const books = [
        { id: 1, title: "Гаррі Поттер", author: "Роулінг" },
        { id: 2, title: "1984", author: "Оруелл" }
    ];
    const bookMap = new Map(books.map(book => [book.id, book]));
    logResult(bookMap);
}

// Частотний аналіз слів
function testWordFrequency() {
    const text = "яблуко банан яблуко груша банан яблуко";
    const words = text.split(" ");
    const frequencyMap = new Map();

    words.forEach(word => {
        frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    });

    logResult([...frequencyMap.entries()]);
}

// Збереження та фільтрація TODO
function testTodoStorage() {
    const todos = [
        { description: "Купити хліб", completed: false, priority: "high" },
        { description: "Попрацювати", completed: true, priority: "low" }
    ];
    localStorage.setItem("todos", JSON.stringify(todos));
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    const highPriorityTodos = storedTodos.filter(todo => !todo.completed && todo.priority === "high");
    logResult(highPriorityTodos);
}

// Очікування всіх запитів
async function testFetchAllData() {
    async function fetchData() { return new Promise(res => setTimeout(() => res("Дані отримані"), 1000)); }
    const results = await Promise.all([fetchData(), fetchData(), fetchData()]);
    logResult(results);
}

// Контроль часу запитів
async function testFetchWithTimeout() {
    async function fetchData() { return new Promise(res => setTimeout(() => res("Дані отримані"), 6000)); }
    const result = await Promise.race([
        fetchData(),
        new Promise((_, rej) => setTimeout(() => rej("Тайм-аут"), 5000))
    ]);
    logResult(result);
}

// Ланцюжок асинхронних запитів
async function testUserDetailsChain() {
    async function getUsers() { return [{ id: 1, name: "Іван" }]; }
    async function getUserDetails(id) { return { id, details: "Деталі користувача" }; }
    async function getUserOrders(id) { return { id, orders: ["Замовлення 1"] }; }

    const users = await getUsers();
    for (const user of users) {
        const details = await getUserDetails(user.id);
        const orders = await getUserOrders(user.id);
        logResult({ user, details, orders });
    }
}

// Повторне виконання запиту
async function testRetryFetch() {
    async function fetchData() {
        return new Promise((resolve, reject) => {
            Math.random() > 0.5 ? resolve("Успіх") : reject("Помилка");
        });
    }

    for (let i = 0; i < 3; i++) {
        try {
            const result = await fetchData();
            logResult(result);
            return;
        } catch (error) {
            console.warn(error);
        }
    }
    logResult("Запит не вдався після 3 спроб");
}

// Запити з паузами
async function testDelayedRequests() {
    async function fetchData() { return new Promise(res => setTimeout(() => res("Дані"), 1000)); }

    for (let i = 0; i < 5; i++) {
        logResult(await fetchData());
        await new Promise(res => setTimeout(res, 3000));
    }
}
