Steps to get database with working data:

- Install MySQL server and get it running
- Ensure `node` and `npm` are installed
  - Check using `node -v` and `npm -v`

- Navigate to this directory in terminal

- Run the `schema.sql` script inside a mysql shell.
  - For example, I open the server shell on my root account with:
    - `mysql -u root -p`, then I'm prompted for my password
  - `source schema.sql` when inside the shell to run the script

- Install node dependencies with `npm install`
- Change the connection params at the top of `index.js` to match your server
- Run the index.js script to insert data into the database
  - `node index.js`