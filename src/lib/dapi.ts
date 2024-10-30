import { client } from "../lib/dashClient";

type DocumentMessages = [{ message: string }];

export const getDocuments = async () => {
  try {
    console.log("getting documents");
    const resultDocs = await client.platform.documents.get(
      "tutorialContract.note",
      { limit: 5 }
    );

    const documentMessages: DocumentMessages = resultDocs.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (d: any) => d.toJSON().message
    );
    console.log("documents", documentMessages);
    // setDocs(fixedDocs)
    return documentMessages;
  } catch (e) {
    console.error("Something went wrong:\n", e);
  } finally {
    client.disconnect();
  }
};
