const TextToHtml = ({ content = "" }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default TextToHtml;
