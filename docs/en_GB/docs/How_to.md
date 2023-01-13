## Document a code part

### Structure

Within the folder of a language there are different folders for different parts of the documentation. The `code` folder contains any documentation for the code from the `src` folder. The folder structure is similar to the `src` folder. Each file also gets its own folder, in which each function should be documented in its own Markdown file. The `docs` folder within a language gives information about the documentation and the `template` folder contains the templates to be used for the documentation. The `scripts` folder contains documentation for scripts that do not involve code, such as adding new scripts.

### Template

Please use the appropriate template in the `templates` folder of your language for the documentation. Your new code part should be documented at least in English, other languages are welcome.

### What should be documented

You should document parts of the code that will be reused frequently. This includes for example functions from the `helper` or `errors` folder. Otherwise, you should document parts that you feel are not self-explanatory. If you yourself feel that documentation is necessary, feel free to add it. Furthermore, you should add documentation to the pull request on request of a collaborator.
