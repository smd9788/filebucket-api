# FileBucket
FileBucket is an app that allows users to upload images onto a virtual file
system. Users can view images from other users and edit/delete their own content.

### Links
* [GitHub Client Repository](https://github.com/honeybunchesofgoats/filebucket-client)
* [GitHub API Repository](https://github.com/honeybunchesofgoats/file-bucket-api)
* [Deployed Client](https://honeybunchesofgoats.github.io/filebucket-client/)
* [Deployed API](https://infinite-ridge-36732.herokuapp.com)

### ERD
![erd](https://i.imgur.com/asklIHX.jpg)

### API Routes
* User
  - /sign-up (POST)
  - /sign-in (POST)
  - /change-password (PATCH)
  - /sign-out (DELETE)
* Upload
  - /uploads (GET)
  - /uploads/all (GET)
  - /uploads/:id (GET)
  - /uploads (POST)
  - /uploads/:id (PATCH)
  - /uploads/:id (DELETE)

### User Stories
* As an unregistered user, I would like to sign up with email and password.
* As a registered user, I would like to sign in with email and password.
* As a signed in user, I would like to change password.
* As a signed in user, I would like to sign out.
* As a signed in user, I would like to upload an image to AWS.
* As a signed in user, I would like to update the meta-data of my image on AWS.
* As a signed in user, I would like to delete my image from AWS.
* As a signed in user, I would like to download images from AWS.
* As a signed in user, I would like to see the name of all images on AWS.
* As a signed in user, I would like to see the thumbnail of all images on AWS.
* As a signed in user, I would like to see the following meta-data for any image:
  - date created/uploaded
  - date modified
  - owner (user who uploaded the image)
  - tag

### Technologies Used
* HTML
* CSS
* JavaScript
* jQuery
* Ajax
* Bootstrap
* Git
* GitHub
* Heroku
* MongoDB
* Mongoose
* Express
* Node

### Development Process
* Establish commit process and Git workflow (see below)
* Layout Back-end
  - Create GitHub repository for API
  - Setup API from template
  - Commit to GitHub and deply to Heroku
* Layout Front-end
  - Create GitHub repository
  - Setup browser template
  - Commit to GitHub
* Setup Back-end
  - Set up schema and test using curl scripts
  - Setup relationship between User and Upload collections
  - Setup Heroku for hosting API
  - Setup AWS for hosting images
* Setup Front-end
  - Create basic front-end components for auth and test in browser
  - Create basic front-end components for resources and test in browser
* Utilize pair programming to build out front-end and back-end
* Testing
  - Component testing and end-to-end user testing
* Styling
  - Focus on displaying information to meet MVP


### Commit Process
* Must be present tense
* End with blank line
* `git add` relevant files for the commit
* Use `git diff --staged` after adding files to see changes for commit details
* Example below:

```
Update get image route

- Update router.get in routes/image_routes
- Change .then(console.log) to .then(handle404)
- Issue with catching error messages
    <blank line here>
```
### General Git Workflow
* Create feature branch
  - `git checkout develpment`
  - `git pull origin development`
  - `git checkout -b my-feature-branch`
* Integrating a feature
  - `git status` in feature branch to ensure changes are commited
  - `git checkout develpment`
  - `git pull origin development`
  - `git checkout my-feature-branch`
  - `git rebase development`
  - If any conflicts were introduced in the previous step, work through the code with your team and resolve each one; when you finish, run `git commit`.
  - `git push origin my-feature-branch`
  - <b>Within your GitHub repo</b> Create a pull request from your feature branch to the development branch.
  - As a team, review the pull request.
  - Click `Create Pull Request`
  - If there are merge conflicts preventing an automatic merge, a member of your team will need to resolve those conflicts manually on their machine, and then push the newly updated development branch back up to GitHub.
  - Click `Merge pull request` `Confirm merge`
  - Once development has been updated, other members of the team will need to rebase their own feature branches on it (as described in Step 2) before they push up those feature branches up to GitHub.
* Other features
  - `git fetch origin` to see what exists on the remote server. After that, you can checkout a branch.

### Deploy Process
* General
  - `git checkout develpment`
  - `git pull origin development`
  - Check that application is working and run tests.
  - `git checkout master`
  - `git merge development`
  - `git push origin master`
  - Client specific
    - `grunt build`
    - `grunt deploy`
  - API specific
    - `git push heroku master`

### Unsolved Problems and Future Work
* Format timestamp for time zone and remove minutes/seconds
* When uploading photo, display in card instead of full size
