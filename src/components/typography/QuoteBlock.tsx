import { motion } from 'framer-motion';
import './QuoteBlock.css';

type QuoteBlockProps = {
  text: string;
  author: string;
  context: string;
};

export default function QuoteBlock({ text, author, context }: QuoteBlockProps) {
  return (
    <figure className="quote-block">
      <motion.blockquote
        className="quote-block__text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        „{text}"
      </motion.blockquote>
      <figcaption className="quote-block__meta">
        <cite className="quote-block__author">{author}</cite>
        <ArchitecturalLineInline />
        <p className="quote-block__context">{context}</p>
      </figcaption>
    </figure>
  );
}

function ArchitecturalLineInline() {
  return <span className="quote-block__rule" aria-hidden="true" />;
}
