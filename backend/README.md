# Language Learning Game (LLG) Backend

## Setup Backend
- Clone the repository

- Make sure you're in the `backend` directory.

### Command to setup

1. Create a virtual environment:

    ```bash
    virtualenv llgenv
    ```

2. Activate the virtual environment:

    ```bash
    source llgenv/bin/activate
    ```

   On Windows:

    ```bash
    .\llgenv\Scripts\activate
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Apply database migrations:

    ```bash
    python manage.py migrate
    ```

5. Create a superuser (for accessing the Django admin):

    ```bash
    python manage.py createsuperuser
    ```

   Follow the prompts to create a superuser account.

6. Start the development server:

    ```bash
    python manage.py runserver
    ```

   The backend should now be running at `http://127.0.0.1:8000/`.

7. Access the Django admin:

   - Go to `http://127.0.0.1:8000/admin/`
   - Log in with the superuser credentials created earlier.

### Using the Language Learning Game Backend

- Create and manage languages, question sets, questions, options, and answers through the Django admin interface.

- Implement API endpoints for handling quiz submissions and retrieving leaderboard data as per your requirements.

## Additional Notes


- Ensure that the virtual environment (`llgenv`) is activated whenever you work on the backend. Deactivate it using `deactivate` when you're done.

- Customize the backend according to your specific requirements.

