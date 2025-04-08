import PageContent from "../../../components/shared/common/layouts/PageContent";
import PageWrapper from "../../../components/shared/common/layouts/PageWrapper";
import TextToHtml from "../../../components/shared/common/TextToHtml";
import { cancellationAndRefundPolicy } from "../../../data/info";

const CancellationPolicy = () => {
  return (
    <PageWrapper>
      <PageContent title="Cancellation & Refund Policy">
        <TextToHtml content={cancellationAndRefundPolicy} />
      </PageContent>
    </PageWrapper>
  );
};

export default CancellationPolicy;
