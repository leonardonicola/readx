import { useParams } from "next/navigation";
import { useMemo } from "react";

function useConversation() {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.id) {
      return "";
    }

    return params.id as string;
  }, [params?.id]);

  return useMemo(
    () => ({
      conversationId
    }),
    [conversationId]
  );
}
export default useConversation;
