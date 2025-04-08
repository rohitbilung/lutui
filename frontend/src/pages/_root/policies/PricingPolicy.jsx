import { pricingPolicy } from "../../../data/info";
import PageWrapper from "../../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../../components/shared/common/layouts/PageContent";
import TextToHtml from "../../../components/shared/common/TextToHtml";

const PricingPolicy = () => {
  return (
    <PageWrapper>
      <PageContent title="Pricing Policy">
        <TextToHtml content={pricingPolicy} />
      </PageContent>
    </PageWrapper>
  );
};

export default PricingPolicy;
