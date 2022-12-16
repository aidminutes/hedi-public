import { findLabelInstance, IGroupComponent } from "@/modules/components";

export function getActionBarDefinition(actionBar?: IGroupComponent) {
  let audioaction,
    shareaction,
    printaction,
    languageaction,
    printaction_articleandcontacts,
    printaction_article,
    printaction_contacts = undefined;

  if (actionBar?.components) {
    audioaction = findLabelInstance(actionBar.components, "audio");
    shareaction = findLabelInstance(actionBar.components, "share");
    printaction = findLabelInstance(actionBar.components, "print");
    languageaction = findLabelInstance(actionBar.components, "language");
    printaction_articleandcontacts = findLabelInstance(
      actionBar.components,
      "printarticleandcontacts"
    );
    printaction_article = findLabelInstance(
      actionBar.components,
      "printarticle"
    );
    printaction_contacts = findLabelInstance(
      actionBar.components,
      "printcontacts"
    );
  }

  const actionBarLabel = {
    audio: audioaction,
    share: shareaction,
    print: {
      print: printaction,
      articleAndContacts: printaction_articleandcontacts,
      article: printaction_article,
      contacts: printaction_contacts,
    },
    language: languageaction,
  };

  return {
    actionBarLabel,
  };
}
