# Prompts.md — AI usage log

This is just a simple list of questions I asked AI while building this project, and
what I understood from the answers. Written in plain, easy words.

## Questions I asked

1. **"What is faker.js and why do we use it?"**
   - Simple answer: faker.js is a tool that creates fake but realistic-looking data —
     like random product names, prices, and stock numbers. I used it because I didn't
     have real company data, so I needed something to fill my database with for
     testing.

2. **"How do I download the table as a CSV file (like Excel)?"**
   - Simple answer: I don't need any extra library. The browser already has a built-in
     way to turn data into a file and download it (`Blob` + `URL.createObjectURL`). I
     just format my table data with commas and let the browser save it as a `.csv`
     file.

3. **"If someone searches 'chair' or 'headphones', how does the filtering actually
   work?"**
   - Simple answer: whatever text I type in the search box gets sent to the backend as
     part of the link (like `?search=chair`). MongoDB then checks which product names
     contain that word and sends back only those matches.

4. **"Why do we wait before searching instead of searching on every letter typed?"**
   - Simple answer: this is called debouncing. If I search on every letter, it would
     send too many requests to the server (like typing "c-h-a-i-r" = 5 requests). So
     instead, it waits half a second after I stop typing, then searches once.

5. **"How can one page have search + category filter + sorting all working together?"**
   - Simple answer: all three (search text, selected category, sort option) are just
     sent together in one request. The backend reads all of them at once and builds one
     final database query using all the filters together.

6. **"How do I make two pages (Dashboard and Inventory) without the whole website
   reloading every time I switch?"**
   - Simple answer: used a tool called `react-router-dom`. It lets React swap out just
     the page content when you click a link, instead of reloading the entire browser
     tab like a normal website would.

7. **"How do I get total inventory value and category totals without slowing down the
   website?"**
   - Simple answer: instead of pulling every single product into my code and doing math
     myself, I let MongoDB do the calculation directly (using something called
     aggregation). MongoDB is built to handle big math like this fast, so it just sends
     back the final answer.

8. **"How do I stop someone from entering wrong data, like price lower than cost?"**
   - Simple answer: added a simple check on the backend — before saving any product, it
     checks the numbers first. If something looks wrong (like negative stock), it
     rejects it and sends back an error message instead of saving bad data.

## What I did myself

- Checked every file to make sure the data names matched properly (like making sure
  "price" in frontend matches "price" in backend).
- Actually tested everything in the browser myself — search, filter, sort, export — to
  make sure it worked before considering it done.

## Why I did it this way

I didn't want to just copy-paste code without understanding it. So for every feature, I
first asked "why" and "how" before using it, so I actually know what my own project is
doing.