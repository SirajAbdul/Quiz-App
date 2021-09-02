using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WEBAPI.Models;

namespace WEBAPI.Controllers
{
    public class ParticipentController : ApiController
    {
        [HttpPost]
        [Route("api/InsertParticipent")]
        public Participent Insert(Participent model)

        {
            using (DBModel db= new DBModel())
            {
                db.Participents.Add(model);
                db.SaveChanges();
                return model;
            }

        }
        [HttpPost]
        [Route("api/UpdateOutput")]
        public void UpdateOutput (Participent model)
        {
            using (DBModel db = new DBModel())
            {
                db.Entry(model).State=System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }

        }

    }
}
