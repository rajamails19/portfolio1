export type MenuItem = { name: string; price: string; desc: string };

export const menuCategories: { key: string; label: string }[] = [
  { key: "soups_and_salads", label: "Soups & Salads" },
  { key: "appetizers_non_veg", label: "Appetizers (Non-Veg)" },
  { key: "appetizers_veg", label: "Appetizers (Veg)" },
  { key: "tandoori", label: "Tandoori" },
  { key: "entrees_non_veg", label: "Entrées (Non-Veg)" },
  { key: "entrees_veg", label: "Entrées (Veg)" },
  { key: "biryanis", label: "Biryanis" },
  { key: "indo_chinese", label: "Indo-Chinese" },
  { key: "breads", label: "Breads" },
  { key: "desserts", label: "Desserts" },
  { key: "kids", label: "Kids" },
];

export const menuData: Record<string, MenuItem[]> = {
  soups_and_salads: [
    { name: "Corn Soup (Veg/Chicken)", price: "$6.99", desc: "Soup made with sweet corn and vegetables." },
    { name: "Hot & Sour Soup (Veg/Chicken)", price: "$6.99", desc: "A bold and flavorful soup with a perfect balance of spicy heat and tangy." },
  ],
  appetizers_non_veg: [
    { name: "Chicken 65", price: "$14.99", desc: "Crispy fried chicken marinated with ginger, garlic and curry leaves." },
    { name: "Seekh Kebab (2 Pieces)", price: "$13.99", desc: "Minced lamb skewers grilled in tandoor with aromatic spices." },
    { name: "Chicken Lollipop (6 Pieces)", price: "$15.99", desc: "Crispy fried chicken wings glazed with Indo-Chinese sauce." },
    { name: "Fish Tikka", price: "$16.99", desc: "Fresh fish marinated in yogurt and spices, grilled in tandoor." },
    { name: "Mutton Shammi Kebab", price: "$14.99", desc: "Tender minced mutton patties with aromatic herbs and spices." },
  ],
  appetizers_veg: [
    { name: "Samosa (3 Pieces)", price: "$6.99", desc: "Crisp pastry pockets stuffed with spiced potatoes and peas." },
    { name: "Gobi 65", price: "$12.99", desc: "Gobi marinated with ginger, garlic & fried for a lovely taste." },
    { name: "Chilli Paneer", price: "$15.99", desc: "Paneer sautéed with chilies, onions & Manchurian sauce." },
    { name: "Paneer 65", price: "$15.99", desc: "Paneer marinated with ginger, garlic & fried for a lovely taste." },
    { name: "Crispy Corn", price: "$11.99", desc: "Golden-fried sweet corn kernels tossed with aromatic spices, herbs, and a hint of tang." },
  ],
  tandoori: [
    { name: "Chicken Tikka", price: "$17.99", desc: "Tender chicken marinated in spiced yogurt, grilled in tandoor." },
    { name: "Tandoori Chicken (Half)", price: "$16.99", desc: "Classic tandoor-roasted chicken with smoky charred flavor." },
    { name: "Paneer Tikka", price: "$16.99", desc: "Cottage cheese cubes marinated in spiced yogurt, grilled in tandoor." },
    { name: "Malai Seekh Kebab", price: "$18.99", desc: "Creamy minced chicken kebabs with cashews and mild spices." },
  ],
  entrees_non_veg: [
    { name: "Butter Chicken", price: "$18.99", desc: "Tender chicken in a rich, creamy tomato-based sauce." },
    { name: "Chicken Vindaloo", price: "$17.99", desc: "Spicy Goan-style chicken curry with tangy vinegar base." },
    { name: "Lamb Rogan Josh", price: "$21.99", desc: "Slow-cooked lamb in Kashmiri spices and yogurt gravy." },
    { name: "Chicken Korma", price: "$18.99", desc: "Chicken in a mild, creamy sauce with nuts and aromatic spices." },
    { name: "Fish Curry", price: "$19.99", desc: "Fresh fish cooked in tangy coastal-style coconut curry." },
  ],
  entrees_veg: [
    { name: "Paneer Butter Masala", price: "$16.99", desc: "Paneer in rich tomato and cashew gravy." },
    { name: "Dal Makhani", price: "$14.99", desc: "Slow-cooked black lentils in buttery tomato gravy." },
    { name: "Palak Paneer", price: "$16.99", desc: "Cottage cheese in a smooth, spiced spinach sauce." },
    { name: "Chana Masala", price: "$14.99", desc: "Chickpeas in a bold, tangy tomato and onion gravy." },
    { name: "Aloo Gobi", price: "$13.99", desc: "Potatoes and cauliflower cooked with aromatic spices." },
  ],
  biryanis: [
    { name: "Chicken Biryani", price: "$19.99", desc: "Aromatic basmati rice layered with spiced chicken and caramelized onions." },
    { name: "Lamb Biryani", price: "$22.99", desc: "Slow-cooked lamb with saffron-infused basmati and crispy onions." },
    { name: "Veg Biryani", price: "$16.99", desc: "Fragrant basmati rice cooked with fresh vegetables and whole spices." },
    { name: "Shrimp Biryani", price: "$21.99", desc: "Juicy shrimp in aromatic basmati layered with mint and spices." },
  ],
  indo_chinese: [
    { name: "Veg Hakka Noodles", price: "$13.99", desc: "Stir-fried noodles with crisp vegetables and soy sauce." },
    { name: "Chicken Fried Rice", price: "$14.99", desc: "Wok-tossed rice with egg, chicken, and mixed vegetables." },
    { name: "Chilli Chicken", price: "$15.99", desc: "Crispy chicken tossed in spicy Indo-Chinese sauce with peppers and onions." },
    { name: "Gobi Manchurian", price: "$13.99", desc: "Crispy cauliflower in tangy, spicy Manchurian sauce." },
  ],
  breads: [
    { name: "Naan", price: "$3.99", desc: "Soft leavened bread baked in tandoor." },
    { name: "Garlic Naan", price: "$4.99", desc: "Naan brushed with garlic butter and herbs." },
    { name: "Peshwari Naan", price: "$5.99", desc: "Sweet naan stuffed with coconut, almonds, and raisins." },
    { name: "Paratha", price: "$4.99", desc: "Whole wheat flaky flatbread, lightly pan-fried." },
    { name: "Poori (2 Pieces)", price: "$4.99", desc: "Deep-fried puffed whole wheat bread." },
  ],
  desserts: [
    { name: "Gulab Jamun (2 Pieces)", price: "$6.99", desc: "Soft milk-solid dumplings soaked in rose-scented sugar syrup." },
    { name: "Kheer", price: "$6.99", desc: "Creamy rice pudding with cardamom and saffron." },
    { name: "Kulfi (Mango/Pistachio)", price: "$7.99", desc: "Traditional Indian ice cream in mango or pistachio flavor." },
    { name: "Rasgulla (2 Pieces)", price: "$6.99", desc: "Soft cottage cheese balls in light sugar syrup." },
  ],
  kids: [
    { name: "Butter Chicken with Rice", price: "$10.99", desc: "Mild butter chicken served with steamed basmati rice." },
    { name: "Mac & Cheese Naan Pizza", price: "$8.99", desc: "Mini naan topped with mac and cheese sauce." },
    { name: "Chicken Nuggets", price: "$9.99", desc: "Crispy chicken bites served with dipping sauce." },
    { name: "Kids Dal with Rice", price: "$8.99", desc: "Mild yellow lentil soup served with basmati rice." },
  ],
};
