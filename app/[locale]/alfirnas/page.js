import Dashboard from '@/components/alfirnas/Dashboard';
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '@/app/i18n';
const i18nNamespaces = ['alfirnas'];
const Alfirnas = async ({ params: { locale } }) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <Dashboard
        locale={locale}
        main_page={t('main_page')}
        users={t('users')}
        messages={t('messages')}
        api_key={t('api_key')}
        version={t('version')}
        model={t('model')}
        select_file={t('select_file')}
        upload_method={t('upload_method')}
        max_overlap={t('max_overlap')}
        min_confidence={t('min_confidence')}
        filter_classes={t('filter_classes')}
        separate_names_with_commas={t('separate_names_with_commas')}
        inference_result={t('inference_result')}
        labels={t('labels')}
        stroke_width={t('stroke_width')}
        sub_classification_id={t('sub_classification_id')}
        email={t('email')}
        address={t('address')}
        national_id={t('national_id')}
        municipality_id={t('municipality_id')}
        iqama_id={t('iqama_id')}
        incident_no={t('incident_no')}
        dob={t('dob')}
        main_classificaiton_id={t('main_classificaiton_id')}
        sub_submunicipality_id={t('sub_submunicipality_id')}
        amana_id={t('amana_id')}
        sub_municipality_id={t('sub_municipality_id')}
        priority={t('priority')}
        first_name={t('first_name')}
        middle_name={t('middle_name')}
        mobile_number={t('mobile_number')}
        issue_discription={t('issue_discription')}
        last_name={t('last_name')}
        location_direction={t('location_direction')}
        run_inference={t('run_inference')}
        enter_class_names={t('enter_class_names')}
        browse={t('browse')}
        url={t('url')}
        upload={t('upload')}
        json={t('json')}
        image={t('image')}
        on={t('on')}
        off={t('off')}
        firnas_aero={t('firnas_aero')}
      />
    </TranslationsProvider>
  );
};

export default Alfirnas;
