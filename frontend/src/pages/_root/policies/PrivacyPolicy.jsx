import PageContent from "../../../components/shared/common/layouts/PageContent";
import PageWrapper from "../../../components/shared/common/layouts/PageWrapper";
import TextToHtml from "../../../components/shared/common/TextToHtml";
import { privacyPolicy } from "../../../data/info";

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <PageContent title="Privacy Policy">
        <TextToHtml content={privacyPolicy} />
      </PageContent>
    </PageWrapper>
  );
};

export default PrivacyPolicy;
