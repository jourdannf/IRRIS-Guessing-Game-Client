# IRRIS Photo Guessing Game

IRRIS Photo Guessing Game is a full-stack application where players are given three tries once a day to guess which member of the K-pop girl group IRRIS belongs to each of five random photos.

### Tech-stack
- Client-side created using HTML, Tailwind CSS, and ReactJS
- Photos handled through Cloudinary
- Randomly cropped photos created with PyTorch RandomCrop
- Answer sheet generated using Python

For more about the server-side of the application and how to download, please visit the documentation here: 

### Rules
1. Players cannot guess the same person per photo more than once
2. Correct guesses are displayed in a green text and incorrect guesses are displayed in red
3. Players can only play one game per day; a new game will be generated at midnight local time

## Set Up and Installation

Coming soon...


## Future Implementations

In the future, I'd like to implement the following features:
- End screen for when a players wins or loses that displays some music from the group
- About page for players who want to learn more about the group and lists where you can find images
- Display of full versions of images once the user gets the one guess correct