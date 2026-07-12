import { StaggerGrid, StaggerItem } from '../pages/StaggerReveal';
import type { felnottkepzesCategories } from '../../content/felnottkepzes';
import './TrainingAreas.css';

type TrainingAreasProps = {
  categories: typeof felnottkepzesCategories;
};

export default function TrainingAreas({ categories }: TrainingAreasProps) {
  return (
    <StaggerGrid className="training-areas">
      {categories.map((category, index) => (
        <StaggerItem key={category.id}>
          <article
            className={`training-areas__item${index % 2 === 1 ? ' training-areas__item--reverse' : ''}`}
          >
            <div className="training-areas__copy">
              <span className="training-areas__index">{category.index}</span>
              <h3>{category.title}</h3>
              <p>{category.text}</p>
            </div>

            <figure className="training-areas__visual">
              <img src={category.visual} alt="" loading="lazy" decoding="async" aria-hidden="true" />
            </figure>
          </article>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
