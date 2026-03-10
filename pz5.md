Практична робота №5
1. const Home = () => {

  const [quantity, setQuantity] = useState(1);

  const product = {
    title: "Evangelions Ayanami Rei Asuka Action Figures Cosplay Usagis Hachiwares Anime Model Doll Cartoon Desktop Ornaments Toy Fans Gift",
    price: "$1.42",
    rating: 4,
    image: "https://p16-oec-general-useast5.ttcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/f1bf6dcc68e54ccaa9f8cfd2d17d2e81~tplv-fhlh96nyum-resize-webp:800:800.webp?dr=12186&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=useast5&from=1826719393"
  };

  const handleBuy = () => {
    alert(`${quantity} sold ${product.title}`);
  };

  return (
    <div className={`${styles.product} ${styles.login}`}>
      <ProductDetails
        image={product.image}
        title={product.title}
        rating={product.rating}
      />

      <ProductActions
        price={product.price}
        quantity={quantity}
        setQuantity={setQuantity}
        onBuy={handleBuy}
      />
    </div>
  );
};
2. const ProductActions = ({ price, quantity, setQuantity, onBuy }) => {
  return (
    <div className={styles.productInfo}>
      <h3>{price} USD</h3>

      <Input 
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}  
      />

      <BuyButton onBuy={onBuy}>BUY NOW</BuyButton> 
    </div>
  );
};
3. const ProductDetails = ({ image, title, description, rating }) => {
  return (
    <div className={styles.product} >
      <img src={image} alt={title} width="200" />
      <h2>{title}</h2>
      <StarRating rating={rating} />
    </div>
  );
};
4. const StarRating = ({ rating }) => {
  return <div>Рейтинг: {"⭐".repeat(rating)}</div>;
};
5. const BuyButton = ({ onBuy }) => {
  return <Button onClick={onBuy}>BUY NOW</Button>;
};
6. 1. Які основні відмінності між презентаційним (Dumb) та контейнерним (Smart) компонентами у React?
Презентаційні відповідають за зовнішній вигляд (UI), отримують дані виключно через props, не мають побічних ефектів і, як правило, не мають власного стану (окрім дрібного UI-стану, наприклад відкриття дропдауну).
Контейнерні (Smart) відповідають за логіку (як речі працюють). Вони викликають API, керують станом (useState, useReducer, Redux) і передають дані вниз до презентаційних компонентів.
2. Поясніть принцип "Джерело істини" (Single Source of Truth) при побудові компонентної ієрархії. Де зазвичай має зберігатися спільний стан (State)? Цей принцип означає, що певна частина даних повинна існувати лише в одному місці (одному стані). Якщо кілька компонентів потребують доступу до одних і тих самих даних, стан переноситься ("піднімається" — Lifting State Up) до їхнього найближчого спільного предка.
3. Чому функція ітерації по масиву (.map()) зазвичай знаходиться на рівні проміжних композиційних компонентів (наприклад, ActivityList), а не всередині атомарних (наприклад, ActivityItem)? Це забезпечує єдиноначальність та простоту атомарних компонентів. ActivityItem має відповідати лише за рендер одного елемента — він не повинен знати про існування масиву. ActivityList є композитором, чия єдина відповідальність — пройтись по масиву і відрендерити потрібну кількість ActivityItem.
4. Що таке явище Prop Drilling і коли воно стає проблемою при глибокій ієрархії компонентів? Prop Drilling — це процес передачі пропсів вниз по дереву компонентів через проміжні рівні, які самі не використовують ці дані, а лише передають їх далі. Це стає проблемою, коли ієрархія дуже глибока: код стає важко читати, рефакторити і підтримувати, оскільки зміна одного пропса вимагає редагування багатьох проміжних файлів.
5. Наведіть критерії, спираючись на які ви приймаєте рішення винести окремий шматок JSX-розмітки у новий незалежний файл компонента.
1. Перевикористання: Якщо шматок UI зустрічається більше одного разу (кнопка, інпут, картка).
2. Складність/Розмір: Якщо компонент стає занадто довгим (наприклад, більше 100-150 рядків) і в ньому важко орієнтуватися.
3. Єдина відповідальність (Single Responsibility): Якщо частина розмітки виконує логічно відокремлену роль (наприклад, відмальовує складний графік всередині великого дашборду).
4. Оптимізація рендеру: Якщо частина UI часто оновлюється, її варто винести в окремий компонент і обгорнути в React.memo, щоб не рендерити всю сторінку.