# VisualDSL Studio (UDL Editor) 🚀

**VisualDSL Studio** — современное CASE-средство, реализующее концепцию *Diagram-as-Code*.

## 📌 Текущий статус проекта

**✅ Завершена Лабораторная работа №3**  
Полная семантическая разметка интерфейса с поддержкой доступности и SEO.

### Что нового:
- **Семантика HTML5:** Переписан весь скелет на смысловые теги
- **Архитектура БЭМ:** База для стилизации (ЛР №4)
- **Microdata (Schema.org):** `SoftwareApplication`, `Organization`, `FAQ`
- **Accessibility:** ARIA-атрибуты, Skip-links

## 📂 Структура фронтенда (ЛР 3)
udl_project/
├── index.html # Семантический каркас
├── css/
│ └── style.css # CSS-переменные + reset
├── js/
│ └── script.js # Заготовка интерактивности
└── README.md # Документация

## 🛠 Технологии
| Технология | Применение |
|------------|------------|
| HTML5 | Semantic, ARIA, Microdata |
| CSS3 | BEM-методология |
| Node.js/npm | Управление зависимостями |
| Git | Ветвление `feature/semantic-markup` |

## 👤 Автор
**Ксения Хаджинова**  
[GitHub: @KsushaKhadzhinova](https://github.com/KsushaKhadzhinova)  
📧 [xju2005@gmail.com](mailto:xju2005@gmail.com)

---

## 🔧 Команды PowerShell (для сдачи ЛР №3)

```powershell
# 1. Переход в папку проекта
cd E:\udl_project

# 2. Создание ветки для ЛР №3
git checkout -b feature/semantic-markup

# 3. Добавление всех файлов
git add .

# 4. Коммит изменений
git commit -m "feat: semantic HTML5 markup + microdata + accessibility (Lab 3)"

# 5. Отправка ветки на GitHub
git push origin feature/semantic-markup

# 6. (Опционально) Слияние в main
git checkout main
git merge feature/semantic-markup
git push origin main
```
