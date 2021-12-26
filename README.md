Survey is a web application created by using .NET and React. You can sign up and sign in and you can define roles on dbside (EnumRole.Member = 10, EnumRole.Admin = 20).
This is a survey based social media platform. You can create your own survey for people vote and you can vote other's and administrator's surveys. Administrators also creates categories. In Discover page, you will see categories.

Installation

You need to install Dotnet, MSSQL, and Node.js. After installation, you can open repo with VSCode or something else. For VSCODE, you need two terminals. For backend, you need to change directory to '/survey.webapi', then you need to write dotnet run. For frontend, you need to change directory to 'survey.client', then you need to write 'npm install', after some installation, you need to write 'npm start'. Now, we are good to go. 


First of all, I suggest you to register, then go to database and make that user's role 20. Then, Login and visit Admin page. Create some categories and post some surveys...
Then, you may login and register with another username. Visit 'Discover', vote and see what happens. 

Note: When voting, I have to update state just in clicking, so there are some problems about that. In this situation, you need to click again, maybe again sometimes. If you don't get http 500, then you already voted, then you can see changes on page. There is no problem about that. I'll handle about this situation.

Another Note: Sometimes you need to wait about 5-10 seconds to load surveys in discover page, if you have much data that may happen to you. Please do not worry and wait 5-10 seconds. That's probably because I used to much joins on Backend. I'll handle about this situation too.

I think I don't have another warning.
