# The Vision

The core idea is to create a 'task-based-coaching' application for people with ADHD, initially looking at a web application.

### What does this mean?

My general thought is that wouldn't it be great to have an application that helps people achieve their unique goals. This would be akin to life coaching, however on a smaller scale.

### How would this work?

A user of the application will be able to create projects, where psychological principles are used to help the user manage, visualize and break down their particular goal. I have made some progress building this part of the web application out (though the layout / design will no doubt change), which you can view an image below:

![Projects View](/public/images/projects-view.jpeg)

### How will someone receive support?

My thinking is that someone who has created a project can choose to 'publish' this project, set a 'payment', identify restrictions on who they would like to receive support from. In the Support View a user can see a list of published projects that are seeking support, and apply to support that person.

### About the supporter.

- There will be a requirement to provide some background as to one's lived experience, or actual experience.
- The supportee will have a opportunity to rate / review the supporters performance.
  - Some thought needs to be given to domains in which they will be reviewed.
- The supporter will need to be granted read only access to the users project details.
- The supporter will have some guidance within the project itself as to how best to support the individual.
  - Some thought needs to be given as to what this guidance looks like.

# How this project came about.

My first degree was psychology, which means that I still have an interest in people and what drives them. A series of conversations with a friend who has been diagnosed with ADHD suggested that many people with this diagnosis have difficulties with planning and organization. My friends self-esteem noticably suffers because of this.

This led to my having the thought that people are invested in projects, therefore they have value. And, wouldn't it be great if you could match up people with useful supportive skills, or backgrounds to help and motivate the other person to achieve there goal.

## So why not use AI instead?

My intuitive thinking is that people feel accountable to other people, therefore whereas AI may be useful (e.g., receiving prompting messages on project progress or supportive messages) I believe that our ability (as humans) to be empathetic will always (or for a long time to come) be superior to AI's mimicry. Although, perhaps there is some combination of the both that would be optimal.

There is also the other side of this. I believe that people will get something out of supporting people, not just financially (e.g., practice - for those aspiring psychologists or counsellors, a sense of community and helping - essentially positive relationships).

# Contributions

Due to the scale of this project, I have decided that it needs a group of developers / designers / psychologists who are interested in working on this. I would suggest if you are interested in working with me and others on this project to get in touch with me @ paul.richard.lewis.esq@gmail.com

## What needs to be done?

### User requirements

- Some work needs to be done on writing the functional requirements. I've made a reasonable start on this which I will look at placing inside of a google doc or something similar.

### Design decisions

- There are a few design decisions that need to be made. Currently I'm using server actions / components to interact with the database, however I am anticipating that it may be beneficial to have a dedicated backend to manage things like: notifications, events, services - which i anticipate will become more complex over time. If you have any thoughts on this, I'm all ears.

- Ideally, I'd love for a designer to be involved to design an interface based on the 'requirements'.

### Database Schema

- Most important project information!? It would be great to survey a few people with adhd to get their iput, alternatively brainstorming the best information.
- It will be nice to have an Entity Relation Diagram.

### Dev Ops

- Need to organise project so that development is easy (e.g., .env files for development and production, scripts, docker-compose)

### More in here as I think of it...

# Get started with the existing project

- fork the repo
- go to the repo settings and then applications and add a new oAuth application (use localhost:3000 as your url).
- add client id and secret that you create in your application to the `.env.development` (which you'll need to create based on .env.example)
- `npm install`
- make sure that docker desktop is running and that you have docker compose installed.
- navigate inside of the project and run `docker compose up`
- `npm run migrate`
- `npm run dev`
