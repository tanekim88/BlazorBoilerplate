using Core.Domain;

namespace Auth.Domain.ValueObjects.Ids.TextMessageProviderIds.TwilioIds
{
    public class TwilioVerifySettingId : TypedIdValueBase<TwilioVerifySettingId>
    {
        private TwilioVerifySettingId() { }
        public TwilioVerifySettingId(int? id= null) 
            : base(id)
        {

        }
    }
}
