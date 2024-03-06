import { Anchor } from '@mantine/core';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <div className={styles['about-container']}>
      <div className={styles.instructions}>
        <ul>
          <li>
            <h4>Sandbox</h4>
            <p>
              Drag and drop rungs, branches, and instructions to create your ladder logic routine.
              Assign tags to store data. Use the simulation button to test your routine.
            </p>
          </li>
          <li>
            <h4>**Coming soon** Exercises</h4>
            <p>
              A guided learning feature which will introduce a complete beginner to ladder logic.
            </p>
          </li>
          <li>
            <h4>Tag Manager</h4>
            <p>
              Use the tag manager on the left side of your screen to create tags and edit their
              values.
            </p>
          </li>
        </ul>
      </div>
      <div>
        <p>
          If you have any suggestions or would like to report a bug, please create an issue on{' '}
          <img src="/imgs/github-mark.png" alt="github logo" width={15} height={15} />{' '}
          <Anchor href="https://github.com/Ferrington/ladderlearner" target="_blank">
            Github
          </Anchor>
          .
        </p>
        <p></p>
      </div>
    </div>
  );
}
