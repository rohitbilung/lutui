import { terms } from "../../../data/info";
import PageWrapper from "../../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../../components/shared/common/layouts/PageContent";
import TextToHtml from "../../../components/shared/common/TextToHtml";

const Terms = () => {
  return (
    <PageWrapper>
      <PageContent title="Terms and Conditions">
        <TextToHtml content={terms} />
      </PageContent>
    </PageWrapper>
  );
};

export default Terms;
