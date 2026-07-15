/* Wissenschaftsbarometer trend dashboard — translation extension (v3).
   Loads after translations.js (window.WB_T with the 2025 wordings).
   WB_T3 = { alias (trendfile code -> 2025 f-code), sec (section names),
             prefix, stem, blockOf, lab (new items), anchors (METI poles),
             fullText (long item texts for subtitles) } */
window.WB_T3 = (function(){
const L=(de,fr,it,en)=>({de,fr,it,en});

/* ---- alias: trendfile variable -> 2025 questionnaire code (reuse WB_T.lab/stem/prefix) ---- */
const alias={
 int_wiss:'f1',
 fth_klima_energie:'f2_1',fth_gesundheit:'f2_2',fth_verkehr_mobili:'f2_3',fth_kommunikation:'f2_4',
 fth_wirtschaftlich:'f2_5',fth_einwanderung:'f2_6',w25_int_ki:'f2_7',
 w25_fernsehen_inkl:'f3_1',med_tvSRF:'f3_2',med_radio:'f3_3',med_radioSRF:'f3_4',
 med_tageszeitungen:'f3_5',med_wissmag:'f3_6',bewmed_zufried:'f4',
 med_internet:'f5_1',med_socnet:'f5_2',med_messenger:'f5_3',w25_podcasts:'f5_4',med_youtube:'f5_5',
 med_wikipedia:'f5_6',med_webseiten_wiss:'f5_7',w25_med_google:'f5_8',w25_med_ki:'f5_9',
 hsm_ich_suche:'f6_1',w25_socmed_posten:'f6_2',w25_socmed_teilen:'f6_3',socmed_like:'f6_4',socmed_comment:'f6_5',
 nmm_museen_ausstel:'f7_1',nmm_zoos_aquarien:'f7_2',nmm_veranstaltunge:'f7_3',nmm_filme_serien:'f7_4',nmm_freunden_bekan:'f7_5',
 ziel_notwend:'f9_1',ziel_staatl:'f9_2',ziel_infooeff:'f9_3',ziel_hoeren:'f9_4',ziel_politik:'f9_5',
 scipop_mitents:'f9_6',ziel_mitfor:'f9_7',ziel_rolle:'f9_8',
 resprom_problem:'f10_1',resprom_verbess:'f10_2',resprom_schnell:'f10_3',resprom_nutzen:'f10_4',
 resprom_freiforsch:'f10_5',resprom_bild:'f10_6',resprom_verlassen:'f10_7',w25_zukunft:'f10_8',w25_ki_erkrankungen:'f10_9',
 vert_uni:'f11_1',vert_wiss:'f11_2',w25_ki_ver_forschung:'f11_3',w25_ver_berichterstattung:'f11_4',w22_vert_berichterstattung:'f11_4',
 self_inform:'f12_1',self_wissen:'f12_2',w25_norms_informierensollte:'f12_3',w25_norms_informieren:'f12_4',
 w25_scilit_herkommen:'f12_5',w25_scilit_informationenfinden:'f12_6',w25_scilit_medienberichte:'f12_7',
 scilit_kontin:'f13_1',scilit_elektr:'f13_2',scilit_antibio:'f13_3',scilit_gene:'f13_4',scilit_theorien:'f13_5',
 w25_scilit_anwendbar:'f13_6',w25_scilit_teil:'f13_7',w25_scilit_steuer:'f13_8',w25_scilit_politberatung:'f13_9',
 w25_scilit_ueberzeugungen:'f13_10',w25_scilit_anfaellig:'f13_11',w25_scilit_internet:'f13_12',w25_scilit_experiment:'f13_13',
 w25_ki_nutzung:'a1',
 w25_ki_skills_nichtwissen:'a2_1',w25_ki_skills_erkennen:'a2_2',w25_ki_skills_erleichtern:'a2_3',w25_ki_skills_effizient:'a2_4',
 w25_ki_skills_moeglichkeiten:'a2_5',w25_ki_skills_auswaehlen:'a2_6',w25_ki_skills_missbrauch:'a2_7',w25_ki_datenschutz:'a2_8',
 w25_ki_skills_funktion:'a2_9',w25_ki_skills_wissen:'a2_10',
 w25_ki_lit_sprache:'a3_1',w25_ki_lit_erkennen:'a3_2',w25_ki_lit_wahrscheinlich:'a3_3',w25_ki_ver:'a4',
 w25_ki_erklaeren:'a5a_1',w25_ki_unterhalten:'a5a_2',w25_ki_herkunft:'a5b_1',w25_ki_falschinfos:'a5b_2',
 w25_ki_nachforschungen:'a6a_1',w25_ki_mitforschen:'a6a_2',w25_ki_einst_beduerfnisse:'a6a_3',w25_ki_debatten:'a6a_4',
 w25_ki_zugang:'a6a_5',w25_ki_antworten:'a6a_6',w25_ki_experten:'a6a_7',
 w25_ki_eigeneanwendungen:'a6b_1',w25_ki_abhaengigkeit:'a6b_2',w25_ki_einst_zukunft:'a6b_3',
 w25_vermeidung_bemueht:'b1_1',w25_vermeidung_vermeiden:'b1_2',w25_polorwiss:'b2_1',
 w25_attack_fehler:'b3_1',w25_attack_geldgeber:'b3_2',w25_attack_polit:'b3_3',w25_attack_demos:'b3_4',
 w25_attack_beleidigung:'b3_5',w25_attack_gewalt:'b3_6',w25_attack_angriffe:'b3_7',w25_attack_budgetcuts:'b3_8',w25_attackperc_verbot:'b3_9',
 w25_attackdes_kritik:'b4_1',w25_attackdes_demos:'b4_2',w25_attackdes_beleidigt:'b4_3',w25_attackdes_gewalt:'b4_4',
 w25_attackdes_angriffe:'b4_5',w25_attackdes_budgetcut:'b4_6',w25_attackdes_verbot:'b4_7',
 scipop_einfluss:'b5_1',scipop_erfahr:'b5_2',scipop_verstand:'b5_3',scipop_vorteil:'b5_4',
 scipop_decke:'b5_5',scipop_gesund:'b5_6',scipop_ehrlich:'b5_7',
};

/* ---- section names (10 master + wave-specific) ---- */
const sec={
 interest:L("Interesse","Intérêt","Interesse","Interest"),
 themes:L("Priorisierte Forschungsthemen der nächsten 15 Jahre","Thèmes de recherche prioritaires pour les 15 prochaines années","Temi di ricerca prioritari per i prossimi 15 anni","Prioritised research topics for the next 15 years"),
 trust:L("Vertrauen","Confiance","Fiducia","Trust"),
 attitudes:L("Einstellungen zu Wissenschaft und Forschung","Attitudes envers la science et la recherche","Atteggiamenti verso scienza e ricerca","Attitudes towards science and research"),
 sources:L("Quellen für Informationen zu Wissenschaft und Forschung","Sources d'information sur la science et la recherche","Fonti di informazione su scienza e ricerca","Sources of information about science and research"),
 activities:L("Wissenschaftskommunikationsaktivitäten","Activités de communication scientifique","Attività di comunicazione scientifica","Science communication activities"),
 literacy:L("Wissen und Selbstwahrnehmung","Connaissances et perception de soi","Conoscenze e autopercezione","Knowledge and self-perception"),
 ai:L("Nutzung und Wahrnehmung von künstlicher Intelligenz","Utilisation et perception de l'intelligence artificielle","Utilizzo e percezione dell'intelligenza artificiale","Use and perception of artificial intelligence"),
 criticism:L("Kritik und Angriffe auf Wissenschaft","Critiques et attaques envers la science","Critiche e attacchi alla scienza","Criticism of and attacks on science"),
 populism:L("Wissenschaftsbezogener Populismus","Populisme lié à la science","Populismo legato alla scienza","Science-related populism"),
 covid:L("COVID-19 (2020)","COVID-19 (2020)","COVID-19 (2020)","COVID-19 (2020)"),
 desinfo:L("Desinformation & alternative Quellen (2022)","Désinformation & sources alternatives (2022)","Disinformazione & fonti alternative (2022)","Disinformation & alternative sources (2022)"),
 pseudo:L("Pseudowissenschaft (2016)","Pseudo-science (2016)","Pseudoscienza (2016)","Pseudoscience (2016)"),
 motive:L("Motive (2016)","Motifs (2016)","Motivazioni (2016)","Motives (2016)"),
 verdrossen:L("Medienverdrossenheit (2019)","Défiance envers les médias (2019)","Sfiducia nei media (2019)","Media disaffection (2019)"),
};

/* ---- new blocks: prefix (chart-title lead) + stem (full question) ---- */
const prefix={
 int_general:L("Interesse an aktuellen Themen","Intérêt pour les thèmes d'actualité","Interesse per i temi d'attualità","Interest in current topics"),
 int16:L("Interesse an wissenschaftlichen Themen","Intérêt pour les thèmes scientifiques","Interesse per i temi scientifici","Interest in scientific topics"),
 media_att:L("Aufmerksamkeit für Wissenschaft in den Medien","Attention portée à la science dans les médias","Attenzione per la scienza nei media","Attention to science in the media"),
 bewmed:L("Bewertung der Medienberichterstattung","Évaluation de la couverture médiatique","Valutazione della copertura mediatica","Evaluation of media coverage"),
 trust16:L("Vertrauen","Confiance","Fiducia","Trust"),
 meti:L("Eigenschaften von Wissenschaftler:innen","Qualités des scientifiques","Qualità degli scienziati","Qualities of scientists"),
 ziel16:L("Einstellungen zur Wissenschaft","Attitudes envers la science","Atteggiamenti verso la scienza","Attitudes towards science"),
 hsm:L("Wissenschaftsbezogene Selbsteinschätzung","Auto-évaluation liée à la science","Autovalutazione sulla scienza","Science-related self-assessment"),
 scilit_x:L("Wissensfragen","Questions de connaissances","Domande di conoscenza","Knowledge questions"),
 motive:L("Motive der Beschäftigung mit Wissenschaft","Motifs de l'intérêt pour la science","Motivazioni dell'interesse per la scienza","Motives for engaging with science"),
 pseudo:L("Pseudowissenschaftliche Aussagen","Énoncés pseudo-scientifiques","Affermazioni pseudoscientifiche","Pseudoscientific statements"),
 verdrossen:L("Medienverdrossenheit","Défiance envers les médias","Sfiducia nei media","Media disaffection"),
 populism19:L("Wissenschaftsbezogener Populismus","Populisme lié à la science","Populismo legato alla scienza","Science-related populism"),
 cov_ver:L("COVID-19: Vertrauen in Akteure","COVID-19 : confiance dans les acteurs","COVID-19: fiducia negli attori","COVID-19: trust in actors"),
 cov_verh:L("COVID-19: Wissenschaft und Politik","COVID-19 : science et politique","COVID-19: scienza e politica","COVID-19: science and politics"),
 cov_perswar:L("COVID-19: Wahrnehmung der Wissenschaft","COVID-19 : perception de la science","COVID-19: percezione della scienza","COVID-19: perception of science"),
 cov_consp:L("COVID-19: Verschwörungsaussagen","COVID-19 : énoncés conspirationnistes","COVID-19: affermazioni complottiste","COVID-19: conspiracy statements"),
 cov_kinder:L("COVID-19: Kinder und Jugendliche","COVID-19 : enfants et adolescents","COVID-19: bambini e giovani","COVID-19: children and adolescents"),
 cov_subjlit:L("COVID-19: Wahrgenommenes Wissen","COVID-19 : connaissances perçues","COVID-19: conoscenze percepite","COVID-19: perceived knowledge"),
 cov_lit:L("COVID-19: Wissensfragen","COVID-19 : questions de connaissances","COVID-19: domande di conoscenza","COVID-19: knowledge questions"),
 cov_medoff:L("COVID-19: Mediennutzung","COVID-19 : utilisation des médias","COVID-19: utilizzo dei media","COVID-19: media use"),
 cov_medon:L("COVID-19: Online-Quellen","COVID-19 : sources en ligne","COVID-19: fonti online","COVID-19: online sources"),
 cov_socmed:L("COVID-19: Online-Aktivitäten","COVID-19 : activités en ligne","COVID-19: attività online","COVID-19: online activities"),
 cov_bewmed:L("COVID-19: Bewertung der Berichterstattung","COVID-19 : évaluation de la couverture","COVID-19: valutazione della copertura","COVID-19: evaluation of coverage"),
 cov_att:L("COVID-19: Aufmerksamkeit","COVID-19 : attention","COVID-19: attenzione","COVID-19: attention"),
 alt22:L("Alternative Informationsquellen","Sources d'information alternatives","Fonti di informazione alternative","Alternative information sources"),
 desinfo22:L("Umgang mit Desinformation","Gestion de la désinformation","Gestione della disinformazione","Dealing with disinformation"),
};
const stem={
 int_general:L("Wie stark interessieren Sie sich für die folgenden Themen?","À quel point les thèmes suivants vous intéressent-ils ?","Quanto la interessano i seguenti temi?","How strongly are you interested in the following topics?"),
 int16:L("Wie stark interessieren Sie sich für die folgenden wissenschaftlichen Themen?","Dans quelle mesure les thèmes scientifiques suivants vous intéressent-ils ?","In che misura la interessano i seguenti temi scientifici?","How strongly are you interested in the following scientific topics?"),
 media_att:L("Wie aufmerksam verfolgen Sie die Medienberichterstattung über Wissenschaft und Forschung?","Avec quelle attention suivez-vous le compte rendu des médias sur la science et la recherche ?","Con quale attenzione segue i servizi dei media su scienza e ricerca?","How attentively do you follow media coverage of science and research?"),
 bewmed:L("Inwieweit stimmen Sie zu? Die Medienberichterstattung über Wissenschaft und Forschung …","Dans quelle mesure approuvez-vous ? Le compte rendu des médias sur la science et la recherche…","In che misura è d'accordo? I servizi dei media su scienza e ricerca…","To what extent do you agree? Media coverage of science and research…"),
 trust16:L("Wie hoch ist Ihr Vertrauen …","Quel est votre niveau de confiance…","Qual è il suo livello di fiducia…","How high is your trust…"),
 meti:L("Welche Eigenschaften verbinden Sie mit Wissenschaftlerinnen und Wissenschaftlern? Wissenschaftler:innen sind …","Quelles qualités associez-vous aux scientifiques ? Les scientifiques sont…","Quali qualità associa agli scienziati? Gli scienziati sono…","Which qualities do you associate with scientists? Scientists are…"),
 ziel16:L("Inwieweit stimmen Sie den folgenden Aussagen zu?","Dans quelle mesure êtes-vous d'accord avec les énoncés suivants ?","In che misura è d'accordo con le seguenti affermazioni?","To what extent do you agree with the following statements?"),
 hsm:L("Inwieweit stimmen die folgenden Aussagen über Sie selbst zu?","Dans quelle mesure les énoncés suivants vous concernant sont-ils exacts ?","In che misura le seguenti affermazioni su di lei sono vere?","To what extent do the following statements about you apply?"),
 scilit_x:L("Sind die folgenden Aussagen richtig oder falsch – und wie sicher sind Sie?","Les énoncés suivants sont-ils exacts ou erronés – et à quel point en êtes-vous sûr ?","Le seguenti affermazioni sono esatte o errate – e quanto ne è sicuro?","Are the following statements true or false – and how sure are you?"),
 motive:L("Wie wichtig sind die folgenden Gründe für Sie, sich mit Wissenschaft und Forschung zu beschäftigen? Ich beschäftige mich damit …","À quel point les raisons suivantes sont-elles importantes pour vous intéresser à la science ? Je m'y intéresse…","Quanto sono importanti per lei i seguenti motivi per occuparsi di scienza? Me ne occupo…","How important are the following reasons for engaging with science? I engage with it…"),
 pseudo:L("Inwieweit stimmen Sie den folgenden Aussagen zu?","Dans quelle mesure êtes-vous d'accord avec les énoncés suivants ?","In che misura è d'accordo con le seguenti affermazioni?","To what extent do you agree with the following statements?"),
 verdrossen:L("Inwieweit stimmen Sie den folgenden Aussagen zu den Nachrichtenmedien zu?","Dans quelle mesure êtes-vous d'accord avec les énoncés suivants sur les médias d'information ?","In che misura è d'accordo con le seguenti affermazioni sui mezzi di informazione?","To what extent do you agree with the following statements about the news media?"),
 populism19:L("Inwieweit stimmen Sie den folgenden Aussagen zu?","Dans quelle mesure êtes-vous d'accord avec les énoncés suivants ?","In che misura è d'accordo con le seguenti affermazioni?","To what extent do you agree with the following statements?"),
 cov_ver:L("Wie hoch ist Ihr Vertrauen in die Aussagen der folgenden Akteure zum Coronavirus?","Quel est votre degré de confiance dans les déclarations des acteurs suivants concernant le coronavirus ?","Qual è la sua fiducia nelle dichiarazioni dei seguenti attori sul coronavirus?","How much do you trust the following actors' statements about the coronavirus?"),
 cov_verh:L("Inwieweit stimmen Sie den folgenden Aussagen zum Coronavirus zu?","Dans quelle mesure êtes-vous d'accord avec les déclarations suivantes sur le coronavirus ?","Quanto concorda con le seguenti affermazioni sul coronavirus?","To what extent do you agree with the following statements about the coronavirus?"),
 cov_perswar:L("Wie nehmen Sie die Rolle der Wissenschaft in der Pandemie wahr? Inwieweit stimmen Sie zu?","Comment percevez-vous le rôle de la science dans la pandémie ? Dans quelle mesure êtes-vous d'accord ?","Come valuta la posizione della scienza nella pandemia? Quanto concorda?","How do you perceive science's role in the pandemic? To what extent do you agree?"),
 cov_consp:L("Inwieweit stimmen Sie den folgenden Aussagen zum Coronavirus zu?","Dans quelle mesure êtes-vous d'accord avec les déclarations suivantes sur le coronavirus ?","Quanto concorda con le seguenti affermazioni sul coronavirus?","To what extent do you agree with the following statements about the coronavirus?"),
 cov_kinder:L("Wie häufig kamen die folgenden Situationen seit Beginn der Pandemie vor?","À quelle fréquence les situations suivantes sont-elles survenues depuis le début de la pandémie ?","Con quale frequenza si sono verificate le seguenti situazioni dall'inizio della pandemia?","How often did the following situations occur since the start of the pandemic?"),
 cov_subjlit:L("Wie schätzen Sie Ihr eigenes Wissen über COVID-19 ein?","Comment estimez-vous votre propre connaissance de la COVID-19 ?","Come valuta le sue conoscenze sul COVID-19?","How do you assess your own knowledge about COVID-19?"),
 cov_lit:L("Sind die folgenden Aussagen zum Coronavirus richtig oder falsch – und wie sicher sind Sie?","Les affirmations suivantes sur le coronavirus sont-elles vraies ou fausses – et à quel point en êtes-vous sûr ?","Le seguenti affermazioni sul coronavirus sono vere o false – e quanto ne è sicuro?","Are the following statements about the coronavirus true or false – and how sure are you?"),
 cov_medoff:L("Wie häufig kamen Sie seit Beginn der Pandemie über die folgenden Medien mit dem Coronavirus in Kontakt?","À quelle fréquence êtes-vous entré en contact avec le thème du coronavirus à travers les médias suivants depuis le début de la pandémie ?","Con quale frequenza è entrato in contatto con il tema del coronavirus tramite i seguenti media dall'inizio della pandemia?","How often did you come into contact with the coronavirus topic through the following media since the pandemic began?"),
 cov_medon:L("Wie häufig kamen Sie im Internet über die folgenden Kanäle mit dem Coronavirus in Kontakt?","À quelle fréquence êtes-vous entré en contact avec le sujet du coronavirus via les canaux suivants sur Internet ?","Con quale frequenza è entrato in contatto con il tema del coronavirus tramite i seguenti canali su internet?","How often did you come into contact with the coronavirus topic through the following online channels?"),
 cov_socmed:L("Wie häufig haben Sie seit Beginn der Pandemie das Folgende getan?","À quelle fréquence avez-vous effectué ce qui suit depuis le début de la pandémie ?","Con quale frequenza ha fatto quanto segue dall'inizio della pandemia?","How often have you done the following since the pandemic began?"),
 cov_bewmed:L("Inwieweit stimmen Sie zu? Die Medienberichterstattung zum Coronavirus war im Allgemeinen …","Dans quelle mesure êtes-vous d'accord ? La couverture médiatique du coronavirus était généralement…","In che misura concorda? La copertura mediatica sul coronavirus è stata in generale…","To what extent do you agree? Media coverage of the coronavirus was generally…"),
 cov_att:L("Wie aufmerksam verfolgen Sie die Medienberichterstattung zum Coronavirus?","Avec quelle attention suivez-vous la couverture médiatique du coronavirus ?","Con quale attenzione segue i servizi dei media sul coronavirus?","How attentively do you follow media coverage of the coronavirus?"),
 alt22:L("Wie häufig kommen Sie über die folgenden alternativen Quellen mit Wissenschaft und Forschung in Kontakt?","À quelle fréquence avez-vous recours aux sources alternatives suivantes pour vous informer sur la science ?","Quanto spesso entra in contatto con la scienza tramite le seguenti fonti alternative?","How often do you come into contact with science through the following alternative sources?"),
 desinfo22:L("Nicht alle Informationen über Wissenschaft und Forschung sind wahr. Wie häufig …","Toutes les informations sur la science ne sont pas vraies. À quelle fréquence…","Non tutte le informazioni sulla scienza sono vere. Quanto spesso…","Not all information about science is true. How often…"),
};

const blockOf={};
const setB=(b,arr)=>arr.forEach(c=>blockOf[c]=b);
setB('int_general',['int_pol','int_wirt','int_sport','int_schicks']);
setB('int16',['w16_int_medizin','w16_int_umwelt','w16_int_biologie','w16_int_raumfahrt','w16_int_polwiss','w16_int_psychologie','w16_int_geschichte','w16_int_kultur_theater']);
setB('media_att',['aufmerksamkeit']);
setB('bewmed',['bewmed_vertrauenswuer','bewmed_gut_verstaendl','bewmed_ausfuehrlich','bewmed_stellt_negativ','w16_bewmed_oft_fehlerhaft','w16_bewmed_zeigt_mir']);
setB('trust16',['w16_vert_industrie_wirt']);
setB('meti',['w19_meti_kompetent','w19_meti_erfahren','w19_meti_qualifiziert','w19_meti_aufrichtig','w19_meti_ehrlich','w19_meti_gerecht','w19_meti_moralisch','w19_meti_ethisch','w19_meti_verantwortungs']);
setB('ziel16',['w16_ziel_oefftlmeinung','w16_ziel_volksabstimmung']);
setB('hsm',['hsm_wichtig_inform','w16_hsm_informieren','w16_hsm_abschaltentv','w16_hsm_meinung','w16_hsm_freundewissen','w16_hsm_medieneinfluss']);
setB('scilit_x',['w16_scilit_sonnencreme','w16_scilit_wasser','w16_scilit_gene','w16_scilit_schizophrenie','w16_scilit_vincent','w16_scilit_geburtenrate','w22_scilit_aktuelle_klima','w22_scilit_kinderimpfunge','w22_scilit_homoeopathisch','w22_scilit_5G','w22_scilit_anbau_gentechn']);
setB('motive',['w16_mot_wissen','w16_mot_neugier','w16_mot_besser_verstehen','w16_mot_mitreden','w16_mot_pruefen']);
setB('pseudo',['w16_pseudo_horoskop','w16_pseudo_autismus','w16_pseudo_psychisch']);
setB('verdrossen',['w19_verdrossen_korrupt','w19_verdrossen_interesse','w19_verdrossen_wuetend','w19_verdrossen_problemeloesen']);
setB('populism19',['w19_scipop_einfachen_leut','w19_scipop_teil_elite']);
setB('media_trad',['med_tv','w16_med_andere_tv','w16_med_20minuten']);
setB('media_online',['med_webseiten_apps','med_mediatheken','med_blogs_foren','w16_med_onlineausgaben']);
setB('engage_online',['socmed_postshare']);
setB('engage_offline',['w16_nmm_sachbuecher','w16_nmm_kinofilme']);
setB('cov_ver',['w20_cov_ver_wissenschaftler','w20_cov_ver_aerzte','w20_cov_ver_politiker','w20_cov_ver_behoerde','w20_cov_ver_journalisten','w20_cov_ver_verwandte']);
setB('cov_verh',['w20_cov_verh_commonsense','w20_cov_verh_wissenwichtig','w20_cov_verh_wisserkenntnis','w20_cov_verh_einmischen','w20_cov_verh_wissbeteiligen']);
setB('cov_perswar',['w20_cov_perswar_kompliziert','w20_cov_perswar_widersprechen','w20_cov_perswar_kontroverse','w20_cov_perswar_nochnichtverstehen','w20_perswar_nichtkommunizieren']);
setB('cov_consp',['w20_cov_consp_grossesache','w20_cov_consp_todeszahl','w20_cov_consp_beweise','w20_cov_consp_hergestellt','w20_cov_consp_gruppenprofit','w20_cov_consp_geplant']);
setB('cov_kinder',['w20_cov_kinder_fragwuerdig','w20_cov_kinder_nichteinordnen','w20_cov_kinder_informiert','w20_cov_kinder_sprechen','w20_cov_kinder_medienkonsum','w20_cov_kinder_pruefen']);
setB('cov_subjlit',['w20_cov_subjlit_suchen','w20_cov_subjlit_weissviel2','w20_cov_subjlit_weissviel1']);
setB('cov_lit',['w20_cov_lit_uebertragbar','w20_cov_lit_getestest','w20_cov_lit_bezeichnung','w20_cov_lit_impfstoff','w20_cov_lit_tierversuch','w20_cov_lit_positivrate']);
setB('cov_medoff',['w20_cov_med_tv','w20_cov_med_tvsrf','w20_cov_med_radio','w20_cov_med_radiosrf','w20_cov_med_zeitungen','w20_cov_med_wissmag','w20_cov_med_internet','w20_cov_med_freunde']);
setB('cov_medon',['w20_cov_med_webseiten_apps','w20_cov_med_mediatheken','w20_cov_med_webseiten_wiss','w20_cov_med_socnet','w20_cov_med_blogs','w20_cov_med_wikipedia','w20_cov_youtube']);
setB('cov_socmed',['w20_cov_socmed_postshare','w20_cov_socmed_like','w20_cov_socmed_comment','w20_cov_socmed_messenger']);
setB('cov_bewmed',['w20_cov_bewmed_vertrauenswuerdig','w20_cov_bewmed_ausfuehrlich','w20_cov_bewmed_verstaendlich','w20_cov_bewmed_korrekt','w20_cov_bewmed_informativ','w20_cov_bewmed_nervig','w20_cov_bewmed_uebertrieben']);
setB('cov_att',['w20_cov_aufmerksamkeit']);
setB('alt22',['w22_alternative','w22_altquelle_links','w22_altquelle_konservativ','w22_alternative_altwebsites','w22_alternative_altinhalte','w22_alternative_altkanaele']);
setB('desinfo22',['w22_desinfo_haeufigkeit','w22_desinfo_taueschen','w22_desinfo_geteilt','w22_desinfo_gutfinden','w22_desinfo_andereinformiert','w22_desinfo_absender','w22_desinfo_ignoriert','w22_desinfo_vermeiden','w22_desinfo_skeptischinfo','w22_desinfo_skeptischquelle']);

/* ---- new item labels ---- */
const lab={
 int_pol:L("Politik im In- und Ausland","Politique nationale et internationale","Politica nazionale ed estera","National and international politics"),
 int_wirt:L("Wirtschaft und Finanzen","Économie et finances","Economia e finanze","Economy and finance"),
 int_sport:L("Sport","Sport","Sport","Sport"),
 int_schicks:L("Menschliche Schicksale, Unglücksfälle, Verbrechen","Situations humaines, accidents, criminalité","Destini umani, casi sfortunati, crimini","Human fates, accidents, crime"),
 w16_int_medizin:L("Medizin","Médecine","Medicina","Medicine"),
 w16_int_umwelt:L("Umwelt- und Energieforschung","Recherche sur l'environnement et l'énergie","Ricerca su ambiente ed energia","Environmental and energy research"),
 w16_int_biologie:L("Biologie","Biologie","Biologia","Biology"),
 w16_int_raumfahrt:L("Raumfahrt","Domaine spatial","Astronautica","Spaceflight"),
 w16_int_polwiss:L("Politikwissenschaft","Science politique","Scienze politiche","Political science"),
 w16_int_psychologie:L("Psychologie","Psychologie","Psicologia","Psychology"),
 w16_int_geschichte:L("Geschichtswissenschaft","Sciences de l'histoire","Scienza della storia","History"),
 w16_int_kultur_theater:L("Kultur (Theater, Film, Musik)","Culture (théâtre, films, musique)","Cultura (teatro, film, musica)","Culture (theatre, film, music)"),
 aufmerksamkeit:L("Aufmerksamkeit für Wissenschaft in den Medien","Attention portée à la science dans les médias","Attenzione per la scienza nei media","Attention to science in the media"),
 med_tv:L("Fernsehen (ohne Online-Mediatheken)","Télévision, sans médiathèques en ligne","Televisione, escluse mediateche online","Television (without online media libraries)"),
 w16_med_andere_tv:L("Andere Fernsehsender","Autres chaînes de télévision","Altre emittenti televisive","Other TV channels"),
 w16_med_20minuten:L("20 Minuten","20 minutes","20 Minuti","20 Minuten (free daily)"),
 med_webseiten_apps:L("Webseiten oder Apps von Zeitungen","Sites web ou applications des journaux et magazines","Siti web o app di giornali e riviste","Websites or apps of newspapers"),
 med_mediatheken:L("Mediatheken von TV- und Radiosendern","Médiathèques de chaînes de télévision et de radio","Mediateche di emittenti televisive e radiofoniche","Broadcasters' online media libraries"),
 med_blogs_foren:L("Blogs oder Online-Foren","Blogs ou forums en ligne","Blog o forum online","Blogs or online forums"),
 w16_med_onlineausgaben:L("Onlineausgaben von Zeitungen","Éditions en ligne de journaux et de magazines","Edizioni online di giornali e riviste","Online editions of newspapers"),
 bewmed_vertrauenswuer:L("… ist vertrauenswürdig","… est digne de confiance","… è affidabile","… is trustworthy"),
 bewmed_gut_verstaendl:L("… ist gut verständlich","… est bien compréhensible","… è facilmente comprensibile","… is easy to understand"),
 bewmed_ausfuehrlich:L("… ist ausführlich","… est détaillée","… è completa","… is detailed"),
 bewmed_stellt_negativ:L("… stellt Wissenschaft negativ dar","… présente la science sous un aspect négatif","… rappresenta negativamente la scienza","… portrays science negatively"),
 w16_bewmed_oft_fehlerhaft:L("… ist oft fehlerhaft","… est souvent erronée","… è spesso errata","… is often flawed"),
 w16_bewmed_zeigt_mir:L("… zeigt mir den Einfluss auf meinen Alltag","… me montre comment la science influence mon quotidien","… mi mostra come la scienza influisce sulla quotidianità","… shows me how science affects my everyday life"),
 socmed_postshare:L("Online posten oder teilen","Publier ou partager en ligne","Postare o condividere online","Post or share online"),
 w16_nmm_sachbuecher:L("Sachbücher lesen","Lire des ouvrages spécialisés","Leggere libri specializzati","Read non-fiction books"),
 w16_nmm_kinofilme:L("Kinofilme anschauen","Regarder des films cinématographiques","Guardare film cinematografici","Watch cinema films"),
 w16_vert_industrie_wirt:L("Wissenschaftler in Industrie und Wirtschaft","Scientifiques au sein des industries et de l'économie","Scienziati nell'industria e nell'economia","Scientists in industry and business"),
 hsm_wichtig_inform:L(null,"Il importe que l'on soit informé sur la science et la recherche.","È importante essere informati su scienza e ricerca.","It is important to be informed about science and research."),
 w16_hsm_informieren:L(null,"Si je veux, je peux m'informer en tout temps sur la science et la recherche.","Se voglio posso informarmi in qualsiasi momento su scienza e ricerca.","If I want, I can inform myself about science at any time."),
 w16_hsm_abschaltentv:L(null,"Lorsqu'il y a des émissions sur la science à la radio ou à la télévision, je change de poste.","Quando in televisione o alla radio ci sono servizi sulla scienza, cambio canale.","When science is on TV or radio, I switch channels."),
 w16_hsm_meinung:L(null,"Mes amis et connaissances me demandent souvent mon opinion à propos de la science.","Spesso amici e conoscenti mi chiedono la mia opinione sulla scienza.","Friends often ask my opinion about science."),
 w16_hsm_freundewissen:L(null,"Mes amis et mes connaissances en savent plus que moi sur la science.","I miei amici e conoscenti ne sanno più di me sulla scienza.","My friends know more about science than I do."),
 w16_hsm_medieneinfluss:L(null,"Les médias exercent une grande influence sur la perception de la science.","I media influiscono molto su come le persone percepiscono la scienza.","Media strongly influence how people perceive science."),
 w16_scilit_sonnencreme:L(null,"La crème solaire protège la peau des rayons ultraviolets.","La crema solare protegge la pelle dai raggi UV.","Sunscreen protects the skin from UV rays."),
 w16_scilit_wasser:L(null,"L'eau bout plus rapidement à haute altitude.","Ad alta quota l'acqua bolle più velocemente.","At high altitudes, water boils faster."),
 w16_scilit_gene:L(null,"Il est possible de modifier les gènes des embryons humains.","È possibile modificare i geni degli embrioni umani.","It is possible to modify the genes of human embryos."),
 w16_scilit_schizophrenie:L(null,"8% de la population suisse souffre de schizophrénie.","L'8% degli svizzeri soffre di schizofrenia.","8% of the Swiss population suffers from schizophrenia."),
 w16_scilit_vincent:L(null,"Vincent van Gogh est un célèbre représentant du surréalisme.","Vincent van Gogh è un noto rappresentante del surrealismo.","Vincent van Gogh is a famous surrealist."),
 w16_scilit_geburtenrate:L(null,"En Suisse, le taux de natalité a baissé au cours des 50 dernières années.","Negli ultimi 50 anni il tasso di natalità in Svizzera è diminuito.","The Swiss birth rate has fallen over the past 50 years."),
 w22_scilit_aktuelle_klima:L("Klimawandel ist natürliche Schwankung","Le changement climatique actuel n'est pas dû à l'homme, mais est une fluctuation naturelle du climat.","L'attuale cambiamento climatico non è causato dall'uomo, ma è una fluttuazione naturale del clima.","Current climate change is a natural fluctuation, not human-made."),
 w22_scilit_kinderimpfunge:L("Kinderimpfungen können Autismus auslösen","La vaccination des enfants contre la rougeole, les oreillons et la rubéole peut provoquer l'autisme.","Le vaccinazioni infantili contro morbillo-parotite-rosolia possono causare l'autismo.","Childhood MMR vaccinations can cause autism."),
 w22_scilit_homoeopathisch:L("Homöopathie wirksamer als Schulmedizin","Les traitements homéopathiques sont plus efficaces que la médecine conventionnelle pour les maladies graves.","I trattamenti omeopatici sono più efficaci di quelli della medicina convenzionale per le malattie gravi.","Homeopathic treatments are more effective than conventional medicine for serious illnesses."),
 w22_scilit_5G:L("Handystrahlung verursacht Hirntumore","Les radiations des téléphones mobiles provoquent des tumeurs au cerveau en quelques années.","Le radiazioni dei telefoni cellulari causano il cancro al cervello nel giro di pochi anni.","Mobile-phone radiation causes brain tumours within a few years."),
 w22_scilit_anbau_gentechn:L("Gentech-Pflanzen brauchen mehr Pestizide","La culture de plantes génétiquement modifiées nécessite davantage de pesticides.","La coltivazione di piante geneticamente modificate richiede più pesticidi.","Growing GM crops requires more pesticides."),
 w16_ziel_oefftlmeinung:L(null,"L'opinion publique devrait être prise en compte lors des décisions concernant la science.","In merito alle decisioni sulla scienza si dovrebbe tenere conto dell'opinione pubblica.","Public opinion should be considered in decisions about science."),
 w16_ziel_volksabstimmung:L(null,"Lorsqu'il s'agit de science, je participe toujours aux votations populaires.","Partecipo sempre alle votazioni popolari quando trattano di scienza.","When science is at stake, I always vote in popular referendums."),
 w19_scipop_einfachen_leut:L(null,"Les gens simples partagent des valeurs et des intérêts communs.","La gente comune condivide gli stessi valori e interessi.","Ordinary people share common values and interests."),
 w19_scipop_teil_elite:L(null,"La science fait partie de l'élite de notre pays.","La scienza fa parte dell'élite del nostro paese.","Science is part of our country's elite."),
 w16_mot_wissen:L("… für Schule und Beruf nützliches Wissen","… afin d'acquérir un savoir utile pour l'école et la profession.","… per ottenere conoscenze utili per la scuola e il lavoro.","… to gain knowledge useful for school and work."),
 w16_mot_neugier:L("… weil ich neugierig bin","… parce que je suis curieux.","… perché sono curioso/a.","… because I am curious."),
 w16_mot_besser_verstehen:L("… um Wissenschaft besser zu verstehen","… pour mieux comprendre la science et la recherche.","… per comprendere meglio la scienza e la ricerca.","… to better understand science and research."),
 w16_mot_mitreden:L("… um mitreden zu können","… pour pouvoir participer à la discussion.","… per poter partecipare alle conversazioni.","… to be able to join the conversation."),
 w16_mot_pruefen:L("… um Informationen zu überprüfen","… pour contrôler des informations reçues d'autres sources.","… per verificare le informazioni ottenute in altro modo.","… to verify information received elsewhere."),
 w16_pseudo_horoskop:L(null,"Les horoscopes peuvent prédire l'avenir.","Gli oroscopi possono prevedere il futuro.","Horoscopes can predict the future."),
 w16_pseudo_autismus:L(null,"Les vaccins provoquent l'autisme chez les enfants.","I vaccini causano l'autismo nei bambini.","Vaccinations cause autism in children."),
 w16_pseudo_psychisch:L(null,"Certaines personnes peuvent communiquer par des forces psychiques ou un sixième sens.","Alcune persone comunicano tramite forze psichiche o con un sesto senso.","Some people communicate via psychic powers or a sixth sense."),
 w19_verdrossen_korrupt:L(null,"Je pense que le système des médias d'information est corrompu.","Penso che il sistema dei mezzi di informazione sia corrotto.","I consider the news media system corrupt."),
 w19_verdrossen_interesse:L(null,"Les médias d'information agissent avant tout dans leur propre intérêt.","I mezzi di informazione agiscono principalmente nel proprio interesse.","The news media act mainly in their own interest."),
 w19_verdrossen_wuetend:L(null,"Les agissements des médias d'information me rendent furieux.","Quello che fanno i mezzi di informazione mi fa arrabbiare.","What the news media do makes me angry."),
 w19_verdrossen_problemeloesen:L(null,"Les médias d'information aident à résoudre les problèmes importants de la société.","I mezzi di informazione aiutano a risolvere gli importanti problemi della società.","The news media help solve society's important problems."),
 /* COVID-19 (2020) */
 w20_cov_ver_wissenschaftler:L("Wissenschaftler:innen","Scientifiques","Scienziati/e","Scientists"),
 w20_cov_ver_aerzte:L("Ärzte und medizinisches Personal","Médecins et personnel de la santé","Medici e personale della salute","Doctors and medical staff"),
 w20_cov_ver_politiker:L("Politiker:innen","Politiques","Esponenti politici","Politicians"),
 w20_cov_ver_behoerde:L("Kantonale Behörden und Bundesämter","Représentants d'autorités cantonales et d'agences fédérales","Rappresentanti delle autorità cantonali e degli uffici federali","Cantonal authorities and federal offices"),
 w20_cov_ver_journalisten:L("Journalist:innen","Journalistes","Giornalisti/e","Journalists"),
 w20_cov_ver_verwandte:L("Verwandte, Bekannte und Freunde","Famille, connaissances et amis","Parenti, conoscenti e amici","Family, acquaintances and friends"),
 w20_cov_verh_commonsense:L("Gesunder Menschenverstand statt Studien","Nous devrions nous reposer davantage sur le bon sens dans la gestion du coronavirus, nous n'avons pas besoin d'études scientifiques.","Nella gestione del coronavirus dovremmo affidarci maggiormente al buon senso, quindi non abbiamo bisogno di studi scientifici.","We should rely more on common sense in dealing with corona; we don't need scientific studies."),
 w20_cov_verh_wissenwichtig:L("Wissen der Wissenschaft ist wichtig","Le savoir des scientifiques est important pour ralentir la propagation du coronavirus en Suisse.","Le conoscenze degli scienziati sono importanti per rallentare la diffusione del coronavirus in Svizzera.","Scientists' knowledge is important to slow the spread of corona in Switzerland."),
 w20_cov_verh_wisserkenntnis:L("Politik soll auf Erkenntnissen beruhen","Les décisions politiques en matière de gestion du coronavirus doivent reposer sur les découvertes scientifiques.","Le decisioni politiche su come affrontare il coronavirus dovrebbero basarsi su prove scientifiche.","Political decisions on corona should rest on scientific findings."),
 w20_cov_verh_einmischen:L("Einmischung ist nicht Aufgabe der Wissenschaft","Ce n'est pas le rôle des scientifiques d'intervenir en politique pour la gestion du coronavirus.","Non è compito degli scienziati interferire nelle decisioni politiche sulla gestione del coronavirus.","It is not scientists' role to intervene in corona politics."),
 w20_cov_verh_wissbeteiligen:L("Wissenschaft soll sich an Debatten beteiligen","Les scientifiques devraient activement participer à des débats politiques sur le coronavirus.","Gli scienziati dovrebbero partecipare attivamente ai dibattiti politici sul coronavirus.","Scientists should actively take part in political debates about corona."),
 w20_cov_perswar_kompliziert:L("Forschung zu kompliziert","La science autour du coronavirus est tellement compliquée qu'il y a beaucoup de choses que je ne comprends pas.","La scienza sul coronavirus è così complicata che ci sono molte cose che non capisco.","Corona science is so complicated that I don't understand much of it."),
 w20_cov_perswar_widersprechen:L("Widersprüche erschweren Urteil","Lorsque les scientifiques se contredisent à l'égard du coronavirus, c'est difficile pour moi de juger quelle information est vraie.","Quando gli scienziati si contraddicono sul coronavirus, per me è difficile valutare quale sia l'informazione corretta.","When scientists contradict each other about corona, it is hard for me to judge what is true."),
 w20_cov_perswar_kontroverse:L("Kontroversen sind hilfreich","Les controverses entre les scientifiques concernant le coronavirus sont utiles, car elles contribuent à imposer les résultats vraiment exacts.","Le controversie tra gli scienziati sul coronavirus sono utili poiché contribuiscono ad affermare i risultati corretti.","Controversies between scientists about corona are helpful, as they help correct findings prevail."),
 w20_cov_perswar_nochnichtverstehen:L("Wissenschaft versteht Corona noch nicht","La science et la recherche ne comprennent pas encore bien le coronavirus.","La scienza e la ricerca non capiscono ancora veramente il coronavirus.","Science does not really understand the coronavirus yet."),
 w20_perswar_nichtkommunizieren:L("Wissenschaft kommuniziert unverständlich","La plupart des scientifiques ne communiquent pas de manière compréhensible sur le coronavirus.","La maggior parte degli scienziati non riesce a comunicare in modo comprensibile sul coronavirus.","Most scientists cannot communicate understandably about corona."),
 w20_cov_consp_grossesache:L("Pandemie wird grösser gemacht","La pandémie de coronavirus est présentée comme plus grave qu'elle ne l'est en réalité.","La pandemia da coronavirus viene fatta apparire più grave di quanto sia in realtà.","The corona pandemic is made into a bigger thing than it is."),
 w20_cov_consp_todeszahl:L("Todeszahlen absichtlich übertrieben","Le nombre de personnes qui meurent du coronavirus est délibérément exagéré par les autorités.","Il numero di persone che muoiono a causa del coronavirus è stato intenzionalmente esagerato dalle autorità.","The number of corona deaths is deliberately exaggerated by the authorities."),
 w20_cov_consp_beweise:L("Keine eindeutigen Beweise für Corona","Il n'y a pas de preuve tangible que le coronavirus existe réellement.","Non esistono prove tangibili che il coronavirus esista realmente.","There is no clear evidence that the coronavirus really exists."),
 w20_cov_consp_hergestellt:L("Corona wurde von Menschen hergestellt","Le coronavirus a été créé par les humains.","Il coronavirus è stato creato dall'uomo.","The coronavirus was made by humans."),
 w20_cov_consp_gruppenprofit:L("Gruppen profitieren von der Pandemie","Certains groupes veulent que la pandémie continue, car ils en profitent.","Alcuni gruppi di persone desiderano che la pandemia continui, così da trarne profitto.","Certain groups want the pandemic to continue because they profit from it."),
 w20_cov_consp_geplant:L("Mächtige haben Pandemie geplant","Des personnes de pouvoir ont planifié la pandémie du coronavirus.","La pandemia da coronavirus è stata pianificata da persone potenti e influenti.","Powerful people planned the corona pandemic."),
 w20_cov_kinder_fragwuerdig:L("Kinder trafen auf fragwürdige Infos","Les enfants ont souvent été confrontés à des informations discutables sur Internet concernant le coronavirus.","In internet i bambini sono spesso entrati a contatto con informazioni dubbie sul coronavirus.","The children often encountered questionable corona information online."),
 w20_cov_kinder_nichteinordnen:L("Kinder konnten Infos nicht einordnen","Les enfants n'ont pas pu se positionner correctement sur de nombreuses informations concernant le coronavirus.","I bambini non sono riusciti a capire correttamente molte informazioni sul coronavirus.","The children could not properly assess much corona information."),
 w20_cov_kinder_informiert:L("Kinder informierten sich selbständig","Les enfants se sont informés de manière autonome sur le coronavirus.","I bambini si sono informati autonomamente sul coronavirus.","The children informed themselves about corona on their own."),
 w20_cov_kinder_sprechen:L("Kinder wollten darüber sprechen","Les enfants voulaient aborder le sujet de la pandémie en raison de leur consommation médiatique.","I bambini desideravano parlare del coronavirus a causa dell'uso dei media.","The children wanted to talk about corona because of their media use."),
 w20_cov_kinder_medienkonsum:L("Medienkonsum der Kinder eingeschränkt","J'ai limité la consommation médiatique quotidienne de mes enfants au sujet du coronavirus.","Ho limitato il consumo quotidiano dei media dei miei figli sul coronavirus.","I limited my children's daily corona media consumption."),
 w20_cov_kinder_pruefen:L("Infos für Kinder auf Verlässlichkeit geprüft","Au cours des derniers mois, j'ai dû vérifier la fiabilité des informations concernant le coronavirus pour les enfants.","Negli ultimi mesi ho dovuto verificare per i bambini l'attendibilità delle informazioni sul coronavirus.","In recent months I had to check the reliability of corona information for the children."),
 w20_cov_subjlit_suchen:L("Ich suche gezielt Informationen","Je cherche des informations ciblées sur le nouveau coronavirus.","Cerco informazioni mirate sul nuovo coronavirus.","I actively search for information about the new coronavirus."),
 w20_cov_subjlit_weissviel2:L("Ich weiss viel über das Coronavirus","J'ai beaucoup de connaissances sur le nouveau coronavirus.","Ho molte conoscenze sul nuovo coronavirus.","I know a lot about the new coronavirus."),
 w20_cov_subjlit_weissviel1:L("Ich weiss viel über die Corona-Forschung","J'ai beaucoup de connaissances sur la manière dont les scientifiques qui mènent des recherches sur le coronavirus travaillent.","Sono molto informato/a sul lavoro degli scienziati che studiano il nuovo coronavirus.","I know a lot about how scientists researching corona work."),
 w20_cov_lit_uebertragbar:L("Übertragung durch Tröpfchen","Le nouveau coronavirus se transmet via des gouttelettes en toussant, éternuant ou par contact rapproché.","Il nuovo coronavirus si trasmette tramite goccioline con tosse, starnuti o contatto ravvicinato.","The new coronavirus is transmitted via droplets from coughing, sneezing or close contact."),
 w20_cov_lit_getestest:L("Mehr als 150'000 positiv Getestete","En Suisse, plus de 150 000 personnes ont été testées positives au coronavirus.","In Svizzera più di 150'000 persone sono risultate positive al coronavirus.","In Switzerland, more than 150,000 people have tested positive for the coronavirus."),
 w20_cov_lit_bezeichnung:L("Wissenschaftlicher Name ist COVID-19","La désignation scientifique du nouveau coronavirus est COVID-19.","La denominazione scientifica del nuovo coronavirus è COVID-19.","The scientific name of the new coronavirus is COVID-19."),
 w20_cov_lit_impfstoff:L("Impfstoffentwicklung dauert ca. 4 Wochen","Le développement d'un vaccin autorisé contre le nouveau coronavirus prend au total près de 4 semaines.","Lo sviluppo di un vaccino autorizzato contro il nuovo coronavirus richiede in totale circa 4 settimane.","Developing an approved vaccine against the new coronavirus takes about 4 weeks."),
 w20_cov_lit_tierversuch:L("Tierversuche in der Corona-Forschung","Des essais sur des animaux sont réalisés lors de la recherche relative au nouveau coronavirus.","Nella ricerca sul nuovo coronavirus vengono utilizzati anche esperimenti sugli animali.","Animal testing is used in research on the new coronavirus."),
 w20_cov_lit_positivrate:L("Falsch-Positiv-Rate von 1%","Un test avec un taux de faux positifs de 1% indique un faux résultat pour seulement 1% de toutes les personnes testées.","Un test con un tasso di falsi positivi dell'1% dà un risultato errato solo nell'1% di tutte le persone testate.","A test with a 1% false-positive rate gives a wrong result for only 1% of all people tested."),
 w20_cov_med_tv:L("Fernsehen (ohne Online-Mediatheken)","Télévision, sans médiathèques en ligne","Televisione, escluse mediateche online","Television (without online media libraries)"),
 w20_cov_med_tvsrf:L("Schweizer Fernsehen SRF","Télévision suisse RTS","Televisione svizzera RSI","Swiss television SRF"),
 w20_cov_med_radio:L("Radio","Radio","Radio","Radio"),
 w20_cov_med_radiosrf:L("Schweizer Radio SRF","Radio suisse RTS","Radio svizzera RSI","Swiss radio SRF"),
 w20_cov_med_zeitungen:L("Gedruckte Zeitungen und Zeitschriften","Quotidiens, journaux hebdomadaires ou magazines imprimés","Quotidiani stampati, settimanali o riviste","Printed newspapers and magazines"),
 w20_cov_med_wissmag:L("Wissenschaftsmagazine","Magazines scientifiques","Riviste scientifiche","Science magazines"),
 w20_cov_med_internet:L("Im Internet","Sur Internet","In internet","On the internet"),
 w20_cov_med_freunde:L("Gespräche mit Freunden und Bekannten","Lors de conversations avec des amis et connaissances","Durante le conversazioni con amici e conoscenti","In conversations with friends and acquaintances"),
 w20_cov_med_webseiten_apps:L("Webseiten oder Apps von Zeitungen","Sites web ou applications des journaux et magazines","Siti web o app di giornali e riviste","Websites or apps of newspapers"),
 w20_cov_med_mediatheken:L("Mediatheken von TV- und Radiosendern","Médiathèques de chaînes de télévision et de radio","Mediateche di emittenti televisive e radiofoniche","Broadcasters' online media libraries"),
 w20_cov_med_webseiten_wiss:L("Webseiten wissenschaftlicher Einrichtungen","Pages web d'organismes scientifiques, d'autorités et d'organisations","Siti web di istituti, autorità e organizzazioni scientifiche","Websites of scientific institutions"),
 w20_cov_med_socnet:L("Soziale Netzwerke","Facebook, Twitter ou autres réseaux sociaux","Facebook, Twitter o altri social network","Social networks"),
 w20_cov_med_blogs:L("Blogs oder Online-Foren","Blogs ou forums en ligne","Blog o forum online","Blogs or online forums"),
 w20_cov_med_wikipedia:L("Wikipedia","Wikipédia","Wikipedia","Wikipedia"),
 w20_cov_youtube:L("Videoplattformen","YouTube ou plateformes vidéo similaires","YouTube o altre piattaforme video","Video platforms"),
 w20_cov_socmed_postshare:L("Online posten oder teilen","Afficher ou partager des informations sur Internet concernant le coronavirus","Postare o condividere informazioni o opinioni sul coronavirus in internet","Post or share corona information online"),
 w20_cov_socmed_like:L("Online liken/favorisieren","Aimer ou favoriser des informations sur le coronavirus sur Internet","Aggiungere \"mi piace\" a informazioni sul coronavirus in internet","Like/favourite corona information online"),
 w20_cov_socmed_comment:L("Online kommentieren","Commenter des informations sur Internet concernant le coronavirus","Commentare informazioni o opinioni sul coronavirus in internet","Comment on corona information online"),
 w20_cov_socmed_messenger:L("Austausch in Messengern","Échanger par messages comme WhatsApp sur le coronavirus","Scambiare informazioni sul coronavirus in servizi di messaggistica come WhatsApp","Exchange about corona in messengers like WhatsApp"),
 w20_cov_bewmed_vertrauenswuerdig:L("… war vertrauenswürdig","… était digne de confiance","… è stata affidabile","… was trustworthy"),
 w20_cov_bewmed_ausfuehrlich:L("… war ausführlich","… était détaillée","… è stata completa","… was detailed"),
 w20_cov_bewmed_verstaendlich:L("… war verständlich","… était compréhensible","… è stata comprensibile","… was understandable"),
 w20_cov_bewmed_korrekt:L("… war korrekt","… était correcte","… è stata corretta","… was accurate"),
 w20_cov_bewmed_informativ:L("… war informativ","… était informative","… è stata informativa","… was informative"),
 w20_cov_bewmed_nervig:L("… war nervig","… était agaçante","… è stata fastidiosa","… was annoying"),
 w20_cov_bewmed_uebertrieben:L("… war übertrieben","… était excessive","… è stata eccessiva","… was exaggerated"),
 w20_cov_aufmerksamkeit:L("Aufmerksamkeit für Corona in den Medien","Attention portée à la couverture médiatique du coronavirus","Attenzione per la copertura mediatica sul coronavirus","Attention to corona media coverage"),
 /* Desinformation & alternative Quellen (2022) */
 w22_alternative:L("Alternative Informationsquellen allgemein","Sources d'information alternatives en général","Fonti di informazione alternative in generale","Alternative information sources in general"),
 w22_altquelle_links:L("Stark linke Medien","Médias très à gauche comme «Le Courrier»","Media molto di sinistra come «laRegione»","Strongly left-wing media"),
 w22_altquelle_konservativ:L("Stark konservative Medien","Médias très conservateurs comme «Le Figaro»","Media molto conservatori come il «Mattino della Domenica»","Strongly conservative media"),
 w22_alternative_altwebsites:L("Alternative Webseiten","Sites web alternatifs comme «Les Observateurs» ou «Breitbart»","Siti web alternativi come «ForumAlternativo» o «Breitbart»","Alternative websites"),
 w22_alternative_altinhalte:L("Alternative Inhalte auf Social Media","Contenus alternatifs publiés sur les réseaux sociaux ou plateformes vidéo","Contenuti alternativi su social media o piattaforme video","Alternative content on social media or video platforms"),
 w22_alternative_altkanaele:L("Alternative Kanäle in Messenger-Apps","Canaux alternatifs dans les applications de messagerie comme Telegram","Canali alternativi nelle app di messaggistica come Telegram","Alternative channels in messaging apps like Telegram"),
 w22_desinfo_haeufigkeit:L("Zweifel an der Richtigkeit von Informationen","Vous demandez-vous si les informations sur la science sont vraies ou fausses ?","Quanto spesso dubita della correttezza delle informazioni sulla scienza?","Doubting whether science information is true or false"),
 w22_desinfo_taueschen:L("Eindruck gezielter Täuschung","Avez-vous eu l'impression que ces informations étaient destinées à vous tromper de manière délibérée ?","Ha avuto l'impressione che queste informazioni fossero volutamente ingannevoli?","Impression of deliberate deception"),
 w22_desinfo_geteilt:L("Informationen mit anderen geteilt","Partager ces informations avec d'autres personnes","Condiviso queste informazioni con altri","Shared this information with others"),
 w22_desinfo_gutfinden:L("Gefallen deutlich gemacht","Indiquer clairement que vous appréciiez ces informations","Lasciato intendere che apprezza queste informazioni","Made clear that you liked this information"),
 w22_desinfo_andereinformiert:L("Andere über Falschheit informiert","Informer d'autres personnes que ces informations sont fausses","Informato altre persone che queste informazioni sono errate","Told others this information was false"),
 w22_desinfo_absender:L("Absender über Falschheit informiert","Informer l'expéditeur que ces informations sont fausses","Informato il mittente che queste informazioni sono errate","Told the sender this information was false"),
 w22_desinfo_ignoriert:L("Informationen ignoriert","Ignorer ces informations","Ignorato queste informazioni","Ignored this information"),
 w22_desinfo_vermeiden:L("Solche Informationen künftig vermieden","Essayer d'éviter ce genre d'informations à l'avenir","Cercato di evitare informazioni di questo tipo in futuro","Tried to avoid this kind of information in future"),
 w22_desinfo_skeptischinfo:L("Skeptischer gegenüber solchen Informationen","Vous avez dès lors été plus sceptique au sujet de ce type d'informations.","Da quel momento è stato più scettico nei confronti di informazioni di questo tipo.","Became more sceptical about this kind of information"),
 w22_desinfo_skeptischquelle:L("Skeptischer gegenüber der Quelle","Vous avez dès lors été plus sceptique envers la source de ces informations.","Da quel momento è stato più scettico nei confronti della fonte di queste informazioni.","Became more sceptical about the source"),
};

/* METI semantic-differential poles: [negative, positive] */
const anchors={
 w19_meti_kompetent:L(["inkompetent","kompetent"],["incompétent","compétent"],["incompetenti","competenti"],["incompetent","competent"]),
 w19_meti_erfahren:L(["unerfahren","erfahren"],["inexpérimenté","expérimenté"],["inesperti","esperti"],["inexperienced","experienced"]),
 w19_meti_qualifiziert:L(["unqualifiziert","qualifiziert"],["non qualifié","qualifié"],["non qualificati","qualificati"],["unqualified","qualified"]),
 w19_meti_aufrichtig:L(["unaufrichtig","aufrichtig"],["hypocrite","franc"],["corrotti","integri"],["insincere","sincere"]),
 w19_meti_ehrlich:L(["unehrlich","ehrlich"],["malhonnête","honnête"],["disonesti","onesti"],["dishonest","honest"]),
 w19_meti_gerecht:L(["ungerecht","gerecht"],["injuste","juste"],["ingiusti","giusti"],["unjust","just"]),
 w19_meti_moralisch:L(["unmoralisch","moralisch"],["amoral","moral"],["immorali","morali"],["immoral","moral"]),
 w19_meti_ethisch:L(["unethisch","ethisch"],["non éthique","éthique"],["non etici","etici"],["unethical","ethical"]),
 w19_meti_verantwortungs:L(["verantwortungslos","verantwortungsbewusst"],["irresponsable","responsable"],["irresponsabili","responsabili"],["irresponsible","responsible"]),
};
/* METI item labels = pole pairs */
Object.keys(anchors).forEach(c=>{lab[c]={};['de','fr','it','en'].forEach(l=>{lab[c][l]=anchors[c][l][0]+' – '+anchors[c][l][1];});});

/* long item text used in the subtitle (menu shows short label) */
const fullText={
 f13_13:L("Zwei Wissenschaftler möchten wissen, ob ein Medikament gegen Diabetes hilft. Wissenschaftler A gibt das Medikament 1000 Erkrankten und testet, wie viele gesund werden. Wissenschaftler B gibt das Medikament 500 Erkrankten, 500 anderen Erkrankten aber nicht – und testet dann, wie viele in beiden Gruppen gesund werden. Das Vorgehen von Wissenschaftler A ist wissenschaftlich korrekt.",
  "Deux scientifiques veulent savoir si un médicament aide contre le diabète. Le scientifique A donne le médicament à 1000 malades et teste combien guérissent. Le scientifique B donne le médicament à 500 malades, mais pas à 500 autres – puis teste combien guérissent dans les deux groupes. La démarche du scientifique A est scientifiquement correcte.",
  "Due scienziati vogliono sapere se un farmaco aiuta contro il diabete. Lo scienziato A somministra il farmaco a 1000 malati e verifica quanti guariscono. Lo scienziato B somministra il farmaco a 500 malati, ma non ad altri 500 – e poi verifica quanti guariscono nei due gruppi. Il procedimento dello scienziato A è scientificamente corretto.",
  "Two scientists want to know if a drug helps against diabetes. Scientist A gives the drug to 1000 patients and tests how many recover. Scientist B gives the drug to 500 patients but not to 500 others – and then tests how many in both groups recover. Scientist A's procedure is scientifically correct."),
};

return {alias,sec,prefix,stem,blockOf,lab,anchors,fullText};
})();
