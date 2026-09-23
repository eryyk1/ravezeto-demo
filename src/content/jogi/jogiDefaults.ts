import {
  defaultAdatvedelemBodyHtml,
  defaultAdatvedelemHeroLead,
  defaultImpressumBodyHtml,
} from './jogiContent.generated';
import type { JogiImpresszumContent, JogiAdatvedelemContent } from '../../services/content/types';

export const defaultJogiImpresszum: JogiImpresszumContent = {
  bodyHtml: defaultImpressumBodyHtml,
};

export const defaultJogiAdatvedelem: JogiAdatvedelemContent = {
  heroLead: defaultAdatvedelemHeroLead,
  bodyHtml: defaultAdatvedelemBodyHtml,
};
