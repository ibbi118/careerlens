import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ content, className = '' }) => {
  if (!content) return null;

  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-2xl text-text mt-6 mb-3">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-xl text-text mt-5 mb-2.5">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-lg text-text mt-4 mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-text-muted leading-relaxed mb-3">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-5 mb-3 space-y-1.5 text-text-muted">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 mb-3 space-y-1.5 text-text-muted">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="text-text font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-text-muted">{children}</em>
          ),
          code: ({ inline, children }) =>
            inline ? (
              <code className="bg-bg text-primary px-1.5 py-0.5 rounded font-mono text-[0.82em]">
                {children}
              </code>
            ) : (
              <code className="block">{children}</code>
            ),
          pre: ({ children }) => (
            <pre className="bg-text text-white p-4 rounded-xl overflow-x-auto mb-4 font-mono text-sm">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-3 border-primary pl-4 italic text-text-muted my-4">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-border my-5" />,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-bg">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 text-left font-semibold text-text border border-border">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 text-text-muted border border-border">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
