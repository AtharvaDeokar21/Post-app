# Django Post App Project

This is a Django-based social media project where users can log in, post their thoughts, see posts from others, follow users, and view follower counts.

## Features

- **User Authentication:** Users can sign up, log in, and log out securely.
- **Posting:** Users can create new posts to share their thoughts.
- **Feed:** Users can see posts from the accounts they follow.
- **Follow System:** Users can follow or unfollow other users.
- **Profile Management:** Users can update their profile information and see their follower count.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AtharvaDeokar21/Post-app.git
```
2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```
3. Install the dependencies:
```bash
pip install -r requirements.txt
```
4. Apply migrations:
```bash
python manage.py migrate
```
5. Create a superuser:
```bash
python manage.py createsuperuser
```
6.Run the development server:
```bash
python manage.py runserver
```

## Usage

- **Sign Up:** Create a new account using the sign-up page.
- **Log In:** Log in with your credentials.
- **Post:** Share your thoughts by creating a new post.
- **Follow Users:** Follow other users to see their posts in your feed.
- **Profile:** Update your profile information and see your follower count.

## Project Structure

- **templates:** Contains the HTML templates.
- **static:** Contains the static files like CSS and JavaScript.
- **feed:** Contains the Django app for the feed functionality.
- **profiles:** Contains the Django app for user profiles.

## Technologies Used
- **Django:** Backend framework
- **Tailwind CSS:** For styling
- **JavaScript:** For interactivity
- **HTML:** For the structure of web pages
- **CSS:** For styling

## Screenshots

- **Home Page**
`![Home Page](screenshots/home.png)`

- **Profile Page**
`![Profile Page](screenshots/profile.png)`

## Contributing

Feel free to fork this project, make improvements, and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgements
- Thanks to the Django community for their valuable resources and support.
- Special thanks to the Tailwind CSS team for their excellent framework.
