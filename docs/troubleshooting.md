# Troubleshooting

**Purpose:** Common problems + solutions. Save future debugging time.

---

## React Beautiful DnD: Drag-and-drop not working

**Problem:** Drag-and-drop fails with error: "Unable to find draggable with id: 1, 2, 3"

**Root cause:** React.StrictMode causes double-rendering in development, which breaks react-beautiful-dnd's internal DOM tracking.

**Solution:** Remove `<React.StrictMode>` wrapper from `index.js`:

```javascript
// Before (broken)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// After (working)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Note:** This is a known limitation of react-beautiful-dnd. StrictMode intentionally double-renders to catch side effects, but the library doesn't handle this well.

---

## FastAPI: 422 Unprocessable Entity on PUT/PATCH/DELETE

**Problem:** GET requests work, but PUT/PATCH/DELETE fail with 422 errors even though the request body looks correct.

**Root cause:** FastAPI automatically redirects requests with trailing slashes:
- `/api/tasks/3/` → redirects to `/api/tasks/3`
- Redirect uses 307 Temporary Redirect
- **Request body is lost during the redirect**

**Initial attempt:** Added trailing slashes to all API calls → GET worked but PUT/PATCH/DELETE still failed.

**Final solution:**
1. Set `redirect_slashes=False` in FastAPI app initialization:
   ```python
   app = FastAPI(title="Compass API", version="0.1.0", redirect_slashes=False)
   ```
2. Remove trailing slashes from PUT/PATCH/DELETE endpoints in `api.js`
3. Keep trailing slash for GET `/tasks/` and POST `/tasks/` (convention)

**Key lesson:** Trailing slash behavior differs between HTTP methods. POST/PUT/PATCH lose their body on redirect.

---

## Pydantic: Due date validation fails with 422

**Problem:** Creating/editing tasks fails with 422 Unprocessable Entity when using the date picker.

**Root cause:** HTML date input returns `"YYYY-MM-DD"` format, but Pydantic's `datetime` field expects a full ISO datetime string like `"YYYY-MM-DDTHH:MM:SS"`.

Additionally, when the date field is empty, it sends an empty string `""` instead of `null`, which Pydantic rejects.

**Solution:** Convert date format before sending to API:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();

  // Convert date to ISO format if present
  let dueDate = null;
  if (formData.due_date && formData.due_date.trim() !== '') {
    // Add time component to make it a valid datetime
    dueDate = `${formData.due_date}T00:00:00`;
  }

  onSave({
    ...formData,
    due_date: dueDate,
    priority: parseInt(formData.priority),
  });
};
```

**Key lesson:** Always check what format your HTML inputs produce vs. what your backend validation expects. Date/time fields are particularly prone to this mismatch.

---

Last updated: 06/02/2026 01:00 from local
