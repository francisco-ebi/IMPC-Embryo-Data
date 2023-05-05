# IMPC Embryo Data
Based on the tools suggested for this exercise, I used Create React App because I felt the exercise it was simple enough and it didn't require more advanced features. I splitted the app into 4 basic components that follows the container/presentational approach, the App component is the one where all the state is located and the rest of the components (Chart, Filters and Introduction) that have all the content.

The main logic is in the data-service.ts file, in which the data is processed and loaded. I used a Map structure to store all the processed information and used the gene symbol to access the rest of the data. Because I sorted the data right from the beginning (based on the total phenotype association count), I choosed this type of variable to preserve the order and to avoid having to re-sort it. Also, it made the filter by gene functionality rather simple.

For the HeatMap chart, I followed [this advice](https://github.com/plouc/nivo/issues/2087#issuecomment-1292723355) and made a chart for each row. With this change I stopped to have performance issues and I could add the tooltip to show the metadata of the associations.
Finally, in the regards of the CSS framework, at the beginning I choosed [Semantic UI](https://react.semantic-ui.com) because I personally like the style of the components but when I started to work on the filtering features, I realized it was missing some components like the range one, so I had to look for other frameworks and I used [MUI](https://mui.com/)

It took me between 10 - 14 hours to finish this exercise (splitted in several days).

## Running the project
After you clone the repo, you need to run:

`yarn install`

After the dependencies are installed, with

`yarn start`

will run the dev server and you can see the project in [http://localhost:3000](http://localhost:3000)

If you want to build the code, you need to use:

`yarn build`

and it will create a build dir